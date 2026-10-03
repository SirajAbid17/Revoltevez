const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// Public
router.get("/", productController.getPublicProducts);
router.get("/:id", productController.getProductById);

module.exports = router;