const User = require("../models/User");

exports.getMe = (req, res) => {
  res.json({
    success: true,
    user: req.dbUser,
    authMethod: req.authMethod,
  });
};


exports.updateMe = async (req, res, next) => {
  try {
    const allowed = ["name", "phone", "address", "city"];

    allowed.forEach((key) => {
      if (req.body[key] !== undefined) req.dbUser[key] = req.body[key];
    });

    await req.dbUser.save();

    res.json({
      success: true,
      message: "Profile updated",
      user: req.dbUser,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteMe = async (req, res, next) => {
  try {
    await req.dbUser.deleteOne();
    res.clearCookie(process.env.COOKIE_NAME || "revoltevez_token");

    res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    next(err);
  }
};


exports.getDashboard = (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.dbUser.name}!`,
    user: req.dbUser,
  });
};


exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};


exports.getAdminStats = async (req, res, next) => {
  try {
    const [total, admins, google, email] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ provider: "google" }),
      User.countDocuments({ provider: "email" }),
    ]);

    res.json({
      success: true,
      stats: {
        total,
        admins,
        google,
        email,
        users: total - admins,
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: "Invalid role. Must be 'user' or 'admin'",
      });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: "Role updated",
      user,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};