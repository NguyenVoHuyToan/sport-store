const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

//Lay danh sach san pham
router.get("/", async (req, res) => {
  try {
    const { category, priceRange } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (typeof priceRange === "string" && priceRange.includes(",")) {
      const rangeValues = priceRange.split(",");
      const min = Number(rangeValues[0]);
      const max = Number(rangeValues[1]);

      // Kiểm tra giá trị hợp lệ
      if (!isNaN(min) && !isNaN(max)) {
        query.price = { $gte: min, $lte: max };
      }
    }

    console.log("Query filter:", query); // Debug filter query

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm:", err); // In lỗi chi tiết
    res.status(500).json({ msg: "Lỗi server", error: err.message });
  }
});
// Tim san pham
router.get("/search", async (req, res) => {
  const query = req.query.q; //lay tu khoa tim kiem tu query
  if (!query) {
    return res.json([]);
  }
  try {

    const products = await Product.find({
      name: { $regex: query, $options: "i" }, //tim kiem khong phan biet chu Hoa- Thuong
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/highlight", async (req, res) => {
  try {
    const products = await Product.find({ isHighlight: true }).select("_id name image price");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//lay san pham tieu bieu

router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(5);

    console.log("Sản phẩm tiêu biểu:", products); // Debug xem có dữ liệu không

    res.json(products);
  } catch (error) {
    console.error("Lỗi backend:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

//Lay san pham theo ID
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID");
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});


//Them san pham moi
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

//xoa san pham
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
