const { getAuth, clerkClient } = require("@clerk/express");
const User = require("../models/User");
const { verifyToken } = require("../utils/generateToken");

/**
 * Universal middleware — accepts EITHER:
 *  A) JWT in cookie OR Authorization header (from /api/auth/session)
 *  B) Clerk session token in Authorization header
 *
 * Attaches: req.dbUser, req.authMethod ("jwt" | "clerk")
 */
module.exports = async function authenticate(req, res, next) {
  try {
    // ============ 1. Try JWT (cookie first) ============
    let token = req.cookies?.[process.env.COOKIE_NAME || "revoltevez_token"];

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      // Pehle check karo — kya ye Clerk ka token hai ya JWT?
      const headerToken = req.headers.authorization.split(" ")[1];

      // Clerk tokens long hote hain (~1000+ chars); JWT 3 dot-separated parts
      const dotCount = (headerToken.match(/\./g) || []).length;

      if (dotCount === 2) {
        // Looks like JWT
        token = headerToken;
      }
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (user && user.isActive) {
          req.dbUser = user;
          req.authMethod = "jwt";
          return next();
        }
      } catch {
        // JWT invalid → fall through to Clerk
      }
    }

    // ============ 2. Fallback: Clerk ============
    const { userId } = getAuth(req);

    if (userId) {
      let user = await User.findOne({ clerkId: userId });

      if (!user) {
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

        const hasGoogle = clerkUser.externalAccounts?.some(
          (a) => a.provider === "google"
        );

        user = await User.create({
          clerkId: userId,
          email,
          name,
          photoURL: clerkUser.imageUrl || "",
          provider: hasGoogle ? "google" : "email",
          lastLoginAt: new Date(),
        });

        console.log(`🆕 User created via Clerk: ${email}`);
      } else {
        user.lastLoginAt = new Date();
        await user.save();
      }

      req.dbUser = user;
      req.clerkUserId = userId;
      req.authMethod = "clerk";
      return next();
    }

    // ============ 3. Nothing worked ============
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