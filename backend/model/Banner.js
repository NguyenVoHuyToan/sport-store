const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Đường dẫn hình ảnh
  link: { type: String, required: true }, // Đường dẫn khi bấm vào banner
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Banner", BannerSchema);
