const Product = require("../models/Product");

/* ============================================================
   HELPER — safe numeric expression for MongoDB aggregation
   Skips "N/A", "", null cleanly using onError
   ============================================================ */
const SAFE_NUMERIC_PRICE = {
  $convert: {
    input: {
      $replaceAll: {
        input: { $toString: "$price" },
        find: ",",
        replacement: "",
      },
    },
    to: "double",
    onError: null, // ✅ "N/A" → null (no crash)
    onNull: null,
  },
};

/* ============================================================
   LIST ALL — for "show all products" queries
   ============================================================ */
exports.listAllProducts = async (limit = 30) => {
  const products = await Product.find({ status: "published" })
    .select("name tagline topSpeed range battery price image _id")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    tagline: p.tagline,
    topSpeed: p.topSpeed,
    range: p.range,
    battery: p.battery,
    price: p.price,
    image: p.image,
  }));
};

/* ============================================================
   SEARCH — text + optional price filter
   ============================================================ */
exports.searchProducts = async ({
  query = "",
  maxPrice = null,
  minPrice = null,
  status = "published",
  limit = 20,
}) => {
  const baseFilter = { status };

  // Text search
  if (query && query.trim()) {
    const q = query.trim();
    baseFilter.$or = [
      { name: { $regex: q, $options: "i" } },
      { tagline: { $regex: q, $options: "i" } },
    ];
  }

  // ---------- WITH PRICE FILTER ----------
  if (minPrice || maxPrice) {
    // Pre-filter out invalid prices before aggregation
    const priceFilter = {
      ...baseFilter,
      price: { $exists: true, $nin: [null, "", "N/A", "n/a"] },
    };

    const pipeline = [
      { $match: priceFilter },
      { $addFields: { numericPrice: SAFE_NUMERIC_PRICE } },
      {
        $match: {
          numericPrice: {
            $ne: null,
            ...(minPrice ? { $gte: Number(minPrice) } : {}),
            ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          tagline: 1,
          topSpeed: 1,
          range: 1,
          battery: 1,
          price: 1,
          image: 1,
          status: 1,
        },
      },
    ];

    const products = await Product.aggregate(pipeline);

    return products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      tagline: p.tagline,
      topSpeed: p.topSpeed,
      range: p.range,
      battery: p.battery,
      price: p.price,
      image: p.image,
      status: p.status,
    }));
  }

  // ---------- WITHOUT PRICE FILTER ----------
  const products = await Product.find(baseFilter)
    .select("name tagline topSpeed range battery price image status _id")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    tagline: p.tagline,
    topSpeed: p.topSpeed,
    range: p.range,
    battery: p.battery,
    price: p.price,
    image: p.image,
    status: p.status,
  }));
};

/* ============================================================
   GET ONE BY ID
   ============================================================ */
exports.getProductById = async (productId) => {
  try {
    const p = await Product.findById(productId)
      .select("name tagline topSpeed range battery price image status views")
      .lean();

    if (!p) return null;

    return {
      id: p._id.toString(),
      name: p.name,
      tagline: p.tagline,
      topSpeed: p.topSpeed,
      range: p.range,
      battery: p.battery,
      price: p.price,
      image: p.image,
      status: p.status,
      views: p.views || 0,
    };
  } catch {
    return null;
  }
};

/* ============================================================
   CATALOG OVERVIEW — fixed with onError, no crash
   ============================================================ */
exports.getProductCategories = async () => {
  const publishedCount = await Product.countDocuments({ status: "published" });
  const draftCount = await Product.countDocuments({ status: "draft" });
  const total = publishedCount + draftCount;

  const priceStats = await Product.aggregate([
    {
      $match: {
        status: "published",
        price: { $exists: true, $nin: [null, "", "N/A", "n/a"] },
      },
    },
    { $addFields: { numericPrice: SAFE_NUMERIC_PRICE } },
    { $match: { numericPrice: { $ne: null, $gt: 0 } } },
    {
      $group: {
        _id: null,
        minPrice: { $min: "$numericPrice" },
        maxPrice: { $max: "$numericPrice" },
        avgPrice: { $avg: "$numericPrice" },
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    total,
    published: publishedCount,
    draft: draftCount,
    priceRange: priceStats[0]
      ? {
          minPrice: Math.round(priceStats[0].minPrice),
          maxPrice: Math.round(priceStats[0].maxPrice),
          avgPrice: Math.round(priceStats[0].avgPrice),
          productsWithPrice: priceStats[0].count,
        }
      : {
          minPrice: 0,
          maxPrice: 0,
          avgPrice: 0,
          productsWithPrice: 0,
        },
  };
};