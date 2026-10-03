const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

/**
 * Empty string / undefined → "N/A"
 */
const sanitize = (val, fallback = "N/A") => {
  if (val === undefined || val === null) return fallback;
  const trimmed = String(val).trim();
  return trimmed === "" ? fallback : trimmed;
};

// ============================================
// PUBLIC — Get all published products
// GET /api/products
// ============================================
exports.getPublicProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ status: "published" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// PUBLIC — Get single product by ID
// GET /api/products/:id
// ============================================
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    product.views = (product.views || 0) + 1;
    await product.save();

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Get all products (published + draft)
// GET /api/admin/products
// ============================================
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Create product (with Cloudinary upload)
// POST /api/admin/products
// multipart/form-data: image (file), name, tagline, topSpeed, range, battery, price, status
// ============================================
exports.createProduct = async (req, res, next) => {
  try {
    const { name, tagline, topSpeed, range, battery, price, status } =
      req.body;

    // Image required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Image is required",
      });
    }

    // Cloudinary URL + public_id
    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename;

    const product = await Product.create({
      name: sanitize(name),
      tagline: sanitize(tagline),
      image: imageUrl,
      imagePublicId,
      topSpeed: sanitize(topSpeed),
      range: sanitize(range),
      battery: sanitize(battery),
      price: sanitize(price),
      status: status === "draft" ? "draft" : "published",
      createdBy: req.dbUser?._id,
    });

    console.log(`🆕 Product created: ${product.name}`);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Update product
// PUT /api/admin/products/:id
// ============================================
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // New image uploaded? Delete old from Cloudinary + set new
    if (req.file) {
      // Delete old image
      if (product.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(product.imagePublicId);
        } catch (err) {
          console.error("Old image delete failed:", err.message);
        }
      }

      product.image = req.file.path;
      product.imagePublicId = req.file.filename;
    }

    const allowed = [
      "name",
      "tagline",
      "topSpeed",
      "range",
      "battery",
      "price",
      "status",
    ];

    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = sanitize(req.body[key]);
      }
    });

    await product.save();

    res.json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// ADMIN — Delete product
// DELETE /api/admin/products/:id
// ============================================
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (err) {
        console.error("Image delete failed:", err.message);
      }
    }

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};