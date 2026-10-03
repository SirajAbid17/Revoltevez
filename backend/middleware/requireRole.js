/**
 * Role-based access middleware.
 * Usage: router.get("/admin", authenticate, requireRole("admin"), handler)
 */
module.exports = function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.dbUser) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    if (!roles.includes(req.dbUser.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }

    next();
  };
};