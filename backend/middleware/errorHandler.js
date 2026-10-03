/**
 * Global error handler
 */
module.exports = (err, req, res, next) => {
  console.error("💥 Error:", err.message);

  // Mongoose validation
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: "Duplicate entry",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      error: "Token expired",
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal server error",
  });
};