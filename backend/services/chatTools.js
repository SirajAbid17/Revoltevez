const { tool } = require("@langchain/core/tools");
const { z } = require("zod");
const productService = require("./productService");
const companyData = require("../config/companyData");


const listAllProductsTool = tool(
  async ({ limit }) => {
    const products = await productService.listAllProducts(limit || 30);

    if (products.length === 0) {
      return JSON.stringify({
        found: false,
        message: "No published products available right now.",
      });
    }

    return JSON.stringify({
      found: true,
      count: products.length,
      products,
    });
  },
  {
    name: "list_all_products",
    description:
      "List the ENTIRE published product catalog. MUST use when user wants to see everything — phrases like: 'show all bikes', 'list all products', 'what do you have', 'show me everything', 'all models', 'poori list', 'saare products', 'sab dikhao'. Returns full catalog. Do NOT use for specific searches like 'bikes under 200000' or 'REVOO C35' — use search_products for those.",
    schema: z.object({
      limit: z
        .number()
        .optional()
        .describe("Max products to return (default 30, use 50 for large catalogs)"),
    }),
  }
);


const searchProductsTool = tool(
  async ({ query, maxPrice, minPrice, limit }) => {
    const products = await productService.searchProducts({
      query: query || "",
      maxPrice: maxPrice || null,
      minPrice: minPrice || null,
      limit: limit || 20,
    });

    if (products.length === 0) {
      return JSON.stringify({
        found: false,
        message:
          "No products matched your search. Try different keywords or price range.",
      });
    }

    return JSON.stringify({
      found: true,
      count: products.length,
      products,
    });
  },
  {
    name: "search_products",
    description:
      "Search products by name, feature, or price range. Use for SPECIFIC queries: 'REVOO C35', 'bikes under 300000', 'long range bikes', 'fastest model', 'bikes between 200000 and 300000', 'sab se sasti bike'. If user wants the FULL catalog without specific filters, use list_all_products instead.",
    schema: z.object({
      query: z
        .string()
        .optional()
        .describe(
          "Search keywords — model name or feature (e.g. 'REVOO', 'long range'). Leave empty for no text filter."
        ),
      maxPrice: z.number().optional().describe("Max price in PKR"),
      minPrice: z.number().optional().describe("Min price in PKR"),
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
  }
);


const getProductDetailsTool = tool(
  async ({ productId }) => {
    const product = await productService.getProductById(productId);
    if (!product) {
      return JSON.stringify({ found: false, message: "Product not found." });
    }
    return JSON.stringify({ found: true, product });
  },
  {
    name: "get_product_details",
    description:
      "Get FULL details of one specific product by its ID. Use AFTER list_all_products or search_products returns an ID that the user wants to know more about.",
    schema: z.object({
      productId: z
        .string()
        .describe("The product _id from a previous list/search result"),
    }),
  }
);


const getCatalogOverviewTool = tool(
  async () => {
    const overview = await productService.getProductCategories();
    return JSON.stringify(overview);
  },
  {
    name: "get_catalog_overview",
    description:
      "Get high-level catalog stats — total count, published vs draft, price range. Use when user asks 'how many products do you have', 'total bikes', 'price range kya hai', 'kitne models hain'.",
    schema: z.object({}),
  }
);


const getCompanyInfoTool = tool(
  async () => JSON.stringify(companyData),
  {
    name: "get_company_info",
    description:
      "Get Revoltevez contact details — phone, email, website, address, business hours. Use when user asks about contacting the company, visiting the factory, business hours, location.",
    schema: z.object({}),
  }
);


module.exports = [
  listAllProductsTool,
  searchProductsTool,
  getProductDetailsTool,
  getCatalogOverviewTool,
  getCompanyInfoTool,
];