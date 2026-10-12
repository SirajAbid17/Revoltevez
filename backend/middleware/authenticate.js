const { getAuth, clerkClient } = require("@clerk/express");
const User = require("../models/User");
const { verifyToken } = require("../utils/generateToken");

module.exports = async function authenticate(req, res, next) {
  try {
    const COOKIE_NAME = process.env.COOKIE_NAME || "revoltevez_token";

    
    const cookieToken = req.cookies?.[COOKIE_NAME];
    if (cookieToken) {
      try {
        const decoded = verifyToken(cookieToken);
        const user = await User.findById(decoded.id);
        if (user && user.isActive) {
          req.dbUser = user;
          req.authMethod = "jwt";
          return next();
        }
      } catch {
       
      }
    }


    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const bearerToken = authHeader.slice(7).trim();

    
      try {
        const decoded = verifyToken(bearerToken);
        const user = await User.findById(decoded.id);
        if (user && user.isActive) {
          req.dbUser = user;
          req.authMethod = "jwt";
          return next();
        }
      } catch {
      
      }

     
      try {
        const verifyClerk =
          require("@clerk/backend").verifyToken ||
          require("@clerk/express").verifyToken;
        const payload = await verifyClerk(bearerToken, {
          secretKey: process.env.CLERK_SECRET_KEY,
        });
        if (payload?.sub) {
          const user = await ensureClerkUser(payload.sub);
          req.dbUser = user;
          req.clerkUserId = payload.sub;
          req.authMethod = "clerk";
          return next();
        }
      } catch {
        
      }
    }

  
    const { userId } = getAuth(req);
    if (userId) {
      const user = await ensureClerkUser(userId);
      req.dbUser = user;
      req.clerkUserId = userId;
      req.authMethod = "clerk";
      return next();
    }

    return res.status(401).json({
      success: false,
      error: "Authentication required",
    });
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

async function ensureClerkUser(userId) {
  let user = await User.findOne({ clerkId: userId });

  if (user) {
    user.lastLoginAt = new Date();
    await user.save();
    return user;
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  const email =
    clerkUser.emailAddresses?.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ||
    clerkUser.emailAddresses?.[0]?.emailAddress ||
    "";

  let name = "User";
  if (clerkUser.firstName && clerkUser.lastName) {
    name = `${clerkUser.firstName} ${clerkUser.lastName}`;
  } else if (clerkUser.firstName) {
    name = clerkUser.firstName;
  } else if (clerkUser.lastName) {
    name = clerkUser.lastName;
  } else if (clerkUser.username) {
    name = clerkUser.username;
  } else if (email) {
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
  } catch (err) {
    if (err.code === 11000) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
      if (user) {
        user.clerkId = userId;
        await user.save();
      }
    } else {
      throw err;
    }
  }

  return user;
}

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