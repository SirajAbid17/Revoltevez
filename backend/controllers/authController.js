const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { getCookieOptions } = require("../utils/cookieOptions");

const COOKIE_NAME = process.env.COOKIE_NAME || "revoltevez_token";

exports.createSession = async (req, res) => {
  try {
    const user = req.dbUser;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user resolved from Clerk session",
      });
    }

    const token = generateToken(user._id);

    
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    console.log("Session created for:", user.email);

    res.json({
      success: true,
      message: "Session created",
      user,           
    });
  } catch (err) {
    console.error("❌ Session error:", err.message);
    res.status(500).json({ success: false, error: "Session creation failed" });
  }
};

exports.logout = (req, res) => {
  const options = getCookieOptions();
  res.clearCookie(COOKIE_NAME, {
    httpOnly: options.httpOnly,
    secure: options.secure,
    sameSite: options.sameSite,
    path: options.path,
  });
  res.json({ success: true, message: "Logged out successfully" });
};

exports.getSession = (req, res) => {
  res.json({
    success: true,
    user: req.dbUser,
    authMethod: req.authMethod,
  });
};

exports.refreshSession = async (req, res) => {
  try {
    const user = req.dbUser;
    const newToken = generateToken(user._id);
    res.cookie(COOKIE_NAME, newToken, getCookieOptions());
    res.json({ success: true, message: "Token refreshed" });  
  } catch (err) {
    res.status(500).json({ success: false, error: "Refresh failed" });
  }
};