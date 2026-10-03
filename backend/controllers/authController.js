const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { getCookieOptions } = require("../utils/cookieOptions");

const COOKIE_NAME = process.env.COOKIE_NAME || "revoltevez_token";

/**
 * POST /api/auth/session
 * Frontend Clerk login ke baad yahan call karega.
 * Clerk token verify hoga (via authenticate middleware) → JWT cookie set hoga.
 */
exports.createSession = async (req, res) => {
  try {
    // req.dbUser authenticate middleware se aata hai
    const user = req.dbUser;

    const token = generateToken(user._id);

    // HTTP-only cookie me JWT set karo
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.json({
      success: true,
      message: "Session created",
      token, // optional — mobile apps ke liye
      user,
    });
  } catch (err) {
    console.error("Session error:", err);
    res.status(500).json({ success: false, error: "Session creation failed" });
  }
};

/**
 * POST /api/auth/logout
 * Cookie clear karta hai
 */
exports.logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    ...getCookieOptions(),
    maxAge: 0,
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

/**
 * GET /api/auth/me
 * Returns current user (works with JWT cookie OR Clerk token)
 */
exports.getSession = (req, res) => {
  res.json({
    success: true,
    user: req.dbUser,
    authMethod: req.authMethod,
  });
};

/**
 * POST /api/auth/refresh
 * JWT cookie refresh karta hai (agar valid hai)
 */
exports.refreshSession = async (req, res) => {
  try {
    const user = req.dbUser;
    const newToken = generateToken(user._id);

    res.cookie(COOKIE_NAME, newToken, getCookieOptions());

    res.json({
      success: true,
      message: "Token refreshed",
      token: newToken,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Refresh failed" });
  }
};