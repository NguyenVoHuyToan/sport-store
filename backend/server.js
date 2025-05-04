const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const path = require("path");

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server is running at ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err);
    process.exit(1);
  }
};

startServer();

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bannerRoute = require("./routes/bannerRoute");
app.use("/api/banners", bannerRoute);

const blogRoute = require("./routes/blog");
app.use("/api/blogs", blogRoute);

const userRoutes = require("./routes/userRoutes"); // Thêm route upload avatar
app.use("/api/user", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

