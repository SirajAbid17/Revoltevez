const { clerkClient, getAuth } = require("@clerk/express");
const User = require("../models/User");

let verifyClerkToken = null;
try {
  verifyClerkToken = require("@clerk/backend").verifyToken;
  console.log("Using @clerk/backend verifyToken");
} catch {
  try {
    verifyClerkToken = require("@clerk/express").verifyToken;
    console.log(" Using @clerk/express verifyToken");
  } catch {
    console.warn("verifyToken NOT available — Bearer auth will fail");
  }
}

module.exports = async function clerkAuth(req, res, next) {
  try {
    let userId = null;

   
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7).trim();

      if (!verifyClerkToken) {
        return res.status(500).json({
          success: false,
          error: "Server misconfigured: verifyToken not available",
        });
      }

      try {
        const payload = await verifyClerkToken(token, {
          secretKey: process.env.CLERK_SECRET_KEY,
        });
        userId = payload.sub;
     
      } catch (err) {
        console.error("Clerk token verify failed:", err.message);
        return res.status(401).json({
          success: false,
          error: "Invalid Clerk token",
        });
      }
    }

  
    if (!userId) {
      const auth = getAuth(req);
      userId = auth?.userId || null;
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Unauthenticated",
      });
    }

  
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("👤 User not in DB, fetching from Clerk:", userId);

      const clerkUser = await clerkClient.users.getUser(userId);

     
      console.log(JSON.stringify({
        id: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        username: clerkUser.username,
        imageUrl: clerkUser.imageUrl,
        primaryEmailAddressId: clerkUser.primaryEmailAddressId,
        emailAddresses: clerkUser.emailAddresses?.map(e => ({
          id: e.id,
          email: e.emailAddress,
          verification: e.verification?.strategy,
        })),
        externalAccounts: clerkUser.externalAccounts?.map(a => ({
          provider: a.provider,
          email: a.emailAddress,
          username: a.username,
        })),
      }, null, 2));
      
      const primaryEmail = clerkUser.emailAddresses?.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      );
      const email =
        primaryEmail?.emailAddress ||
        clerkUser.emailAddresses?.[0]?.emailAddress ||
        "";

      if (!email) {
        console.error("No email returned from Clerk!");
        return res.status(400).json({
          success: false,
          error: "Clerk user has no email address",
        });
      }

      
      let name = "User";
      if (clerkUser.firstName && clerkUser.lastName) {
        name = `${clerkUser.firstName} ${clerkUser.lastName}`;
      } else if (clerkUser.firstName) {
        name = clerkUser.firstName;
      } else if (clerkUser.lastName) {
        name = clerkUser.lastName;
      } else if (clerkUser.username) {
        name = clerkUser.username;
      } else {
        name = email.split("@")[0];
      }

      const isGoogle = detectGoogleAuth(clerkUser);

      

      try {
        user = await User.create({
          clerkId: userId,
          email: email.toLowerCase().trim(),
          name: name.trim(),
          photoURL: clerkUser.imageUrl || "",
          provider: isGoogle ? "google" : "email",
          lastLoginAt: new Date(),
        });

      
        console.log("✅ USER CREATED IN DB");
        console.log("   _id:     ", user._id.toString());
        console.log("   clerkId: ", user.clerkId);
        console.log("   email:   ", user.email);
        console.log("   name:    ", user.name);
        console.log("   provider:", user.provider);
      
      } catch (dbErr) {
      
        console.error("❌ DB CREATE FAILED");
        console.error("   Message:", dbErr.message);
        console.error("   Code:   ", dbErr.code);
        console.error("   Name:   ", dbErr.name);
        if (dbErr.code === 11000) {
          console.error("   Duplicate key:", dbErr.keyValue);
         
          const existing = await User.findOne({
            $or: [{ clerkId: userId }, { email: email.toLowerCase().trim() }],
          });
          if (existing) {
            console.log("  Found existing user, linking clerkId");
            existing.clerkId = userId;
            existing.lastLoginAt = new Date();
            await existing.save();
            user = existing;
          } else {
            return res.status(500).json({
              success: false,
              error: "Duplicate key but user not found",
            });
          }
        } else {
          console.error(dbErr.stack);
          return res.status(500).json({
            success: false,
            error: "DB create failed: " + dbErr.message,
          });
        }
      }
     
    } else {
      user.lastLoginAt = new Date();
      await user.save();
      console.log(" User found in DB:", user.email);
    }

    req.dbUser = user;
    req.clerkUserId = userId;
    req.authMethod = "clerk";
    next();
  } catch (err) {
    console.error("❌ Clerk auth error:", err.message);
    console.error(err.stack);
    return res.status(401).json({
      success: false,
      error: "Clerk authentication failed: " + err.message,
    });
  }
};

function detectGoogleAuth(clerkUser) {
  const hasGoogleExternal = clerkUser.externalAccounts?.some(
    (a) =>
      a.provider === "oauth_google" ||
      a.provider === "google" ||
      a.provider === "google_oauth"
  );
  if (hasGoogleExternal) return true;

  const primaryEmail =
    clerkUser.emailAddresses?.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    ) || clerkUser.emailAddresses?.[0];

  if (primaryEmail?.verification?.strategy === "oauth_google") return true;
  return false;
}