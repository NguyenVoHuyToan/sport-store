const mongoose = require("mongoose");
const Banner = require("./models/Banner");

mongoose.connect("mongodb://localhost:27017/sportshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBanners = async () => {
  await Banner.deleteMany(); // Xóa dữ liệu cũ (nếu có)
  await Banner.insertMany([
    {
      title: "Siêu Sale Giày Bóng Đá",
      description: "Giảm giá 30% cho giày bóng đá Nike, Adidas!",
      image: "https://example.com/images/banner1.jpg",
      link: "/products/football",
    },
    {
      title: "Ưu Đãi Áo Thể Thao",
      description: "Mua áo thể thao, nhận ngay voucher 100K!",
      image: "https://example.com/images/banner2.jpg",
      link: "/products/shirts",
    },
  ]);

  console.log("Thêm banner thành công!");
  mongoose.disconnect();
};

seedBanners();
