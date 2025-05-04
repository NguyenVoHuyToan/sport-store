const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");

//Lay danh sach san pham
router.get("/", async (req, res) => {
  try {
    const { category, priceRange, brand, shoeSize, clothingSize } = req.query;
    let query = {};

    // Lọc theo danh mục
    if (category) query.category = category;

    // Lọc theo khoảng giá (priceRange dạng "min,max")
    if (priceRange && typeof priceRange === "string") {
      const [min, max] = priceRange.split(",").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        query.price = { $gte: min, $lte: max };
      } else {
        console.warn("priceRange không hợp lệ:", priceRange);
      }
    }

    // Lọc theo thương hiệu
    if (brand) query.brand = brand;

    // Lọc theo size giày (shoeSize là mảng)
    if (shoeSize) {
      const sizes = shoeSize.split(",").map(Number).filter((s) => !isNaN(s));
      if (sizes.length) query.shoeSizes = { $in: sizes };
    }

    // Lọc theo size quần áo (clothingSize là mảng)
    if (clothingSize) {
      const sizes = clothingSize.split(",").filter((s) => s.trim() !== "");
      if (sizes.length) query.clothingSizes = { $in: sizes };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm:", err);
    res.status(500).json({ msg: "Lỗi server" });
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
    const product = await Product.findById(req.params.id).populate("reviews.user", "name");
    if (!product) return res.status(404).json({ msg: "Sản phẩm không tồn tại" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server" });
  }
});

router.get("/:id/similar", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Sản phẩm không tồn tại" });

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Loại trừ sản phẩm hiện tại
    }).limit(4);

    res.json(similarProducts);
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server" });
  }
});

router.post("/:id/review", authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ msg: "Vui lòng nhập đầy đủ thông tin" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Sản phẩm không tồn tại" });

    const newReview = { 
      user: req.user.id, // Lấy user từ token
      rating, 
      comment 
    };

    product.reviews.push(newReview);
    await product.save();

    res.json({ msg: "Đánh giá thành công", reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server" });
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
