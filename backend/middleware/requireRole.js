module.exports = function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.dbUser) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    
    const userRole = String(req.dbUser.role || "").toLowerCase().trim();
    const allowed = roles.map((r) => String(r).toLowerCase().trim());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: "Access denied — insufficient permissions",
       
        ...(process.env.NODE_ENV !== "production" && {
          required: roles,
          yourRole: userRole,
        }),
      });
    }

    next();
  };
};