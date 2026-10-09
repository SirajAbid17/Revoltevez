require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { clerkMiddleware } = require("@clerk/express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const productsRoutes = require("./routes/products");
const adminProductsRoutes = require("./routes/adminProducts");
const errorHandler = require("./middleware/errorHandler");
const feedbackRoutes = require("./routes/feedback");
const adminFeedbackRoutes = require("./routes/adminFeedback");
const storyRoutes = require("./routes/storyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const groqRotator = require("./services/groqRotator");

const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(clerkMiddleware());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin/feedback", adminFeedbackRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api", chatRoutes);
app.use("/api", bookingRoutes);


app.get("/", (_, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Revoltevez API is running ",
    groqKeys: groqRotator.stats(),
    timestamp: new Date().toISOString(),
  });
});


app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  const s = groqRotator.stats();

  app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`CORS allowed: ${process.env.CLIENT_URL}`);
    console.log(`Cookie name: ${process.env.COOKIE_NAME}`);
    console.log(`Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(
      `Groq Keys: ${s.total} loaded (${s.availableCount} ready)`
    );
    
  });
};

start();