const express = require("express");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(authenticate);

// User
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);
router.get("/dashboard", userController.getDashboard);

// Admin — real users list
router.get("/all", requireRole("admin"), userController.getAllUsers);
router.get("/admin/stats", requireRole("admin"), userController.getAdminStats);
router.put("/:userId/role", requireRole("admin"), userController.updateUserRole);
router.delete("/:userId", requireRole("admin"), userController.deleteUserById);

module.exports = router;