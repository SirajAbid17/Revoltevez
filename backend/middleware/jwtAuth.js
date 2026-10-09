const User = require("../models/User");
const { verifyToken } = require("../utils/generateToken");

module.exports = async function jwtAuth(req, res, next) {
  try {
   
    let token = req.cookies?.[process.env.COOKIE_NAME || "revoltevez_token"];

   
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No JWT token provided",
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: "User not found or inactive",
      });
    }

    req.dbUser = user;
    req.authMethod = "jwt";
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired JWT",
    });
  }
};