const express = require("express");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

const router = express.Router();

// All admin product routes require admin
router.use(authenticate, requireRole("admin"));

// GET all products
router.get("/", productController.getAllProducts);

// CREATE — image upload (field name: "image")
router.post("/", upload.single("image"), productController.createProduct);

// UPDATE — image optional
router.put("/:id", upload.single("image"), productController.updateProduct);

// DELETE
router.delete("/:id", productController.deleteProduct);

module.exports = router;