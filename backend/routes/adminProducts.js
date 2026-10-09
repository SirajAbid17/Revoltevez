const express = require("express");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

const router = express.Router();


router.use(authenticate, requireRole("admin"));


router.get("/", productController.getAllProducts);


router.post("/", upload.single("image"), productController.createProduct);


router.put("/:id", upload.single("image"), productController.updateProduct);


router.delete("/:id", productController.deleteProduct);

module.exports = router;