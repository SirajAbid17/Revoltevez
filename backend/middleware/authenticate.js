const { getAuth, clerkClient } = require("@clerk/express");
const User = require("../models/User");
const { verifyToken } = require("../utils/generateToken");

module.exports = async function authenticate(req, res, next) {
  try {
    const COOKIE_NAME = process.env.COOKIE_NAME || "revoltevez_token";
    const authHeader = req.headers.authorization;
    const hasBearer = authHeader && authHeader.startsWith("Bearer ");
    const bearerToken = hasBearer ? authHeader.slice(7).trim() : null;

    
    if (bearerToken) {
    
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
        error: "Invalid or expired token",
      });
    }

    
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
    console.error("❌ Auth error:", err.message);
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
    clerkUser.emailAddresses?.[0]?.emailAddress ||
    clerkUser.primaryEmailAddress?.emailAddress ||
    "";

  const name =
    clerkUser.firstName && clerkUser.lastName
      ? `${clerkUser.firstName} ${clerkUser.lastName}`
      : clerkUser.firstName ||
        clerkUser.username ||
        email.split("@")[0] ||
        "User";

  
  const isGoogle = detectGoogleAuth(clerkUser);

  user = await User.create({
    clerkId: userId,
    email,
    name,
    photoURL: clerkUser.imageUrl || "",
    provider: isGoogle ? "google" : "email",
    lastLoginAt: new Date(),
  });

  console.log(`🆕 User created via Clerk: ${email} (${user.provider})`);
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

  // Check 2: primary email verification strategy
  const primaryEmail =
    clerkUser.emailAddresses?.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    ) || clerkUser.emailAddresses?.[0];

  if (primaryEmail?.verification?.strategy === "oauth_google") {
    return true;
  }

  return false;
}