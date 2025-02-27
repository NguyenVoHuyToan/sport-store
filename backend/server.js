const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bannerRoute = require("./routes/bannerRoute");
app.use("/api/banners", bannerRoute);

const blogRoute = require("./routes/blog");
app.use("/api/blogs", blogRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));