import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/featured")
      .then((res) => {
        console.log("dữ liệu tải", res.data)
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container max-w-4xl mx-auto my-12 px-4 ">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Sản phẩm tiêu biểu
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Đang tải sản phẩm...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">Không có sản phẩm nào</p>
      ) : (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {products.map((product) => (
            <SwiperSlide
            key={product._id}
            onClick={() => navigate(`/blog/${product.category}`)}
          >
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-xl cursor-pointer transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded-md"
              />
            </div>
          </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedProducts;
