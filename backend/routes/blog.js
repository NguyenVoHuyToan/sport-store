const express = require("express");
const Blog = require("../model/Blog");
const Product = require("../model/Product");
const router = express.Router();

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    console.log("Category nhận được:", category);

    const blog = await Blog.findOne({ category });

    console.log("Blog tìm thấy:", blog);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    res.json(blog);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;