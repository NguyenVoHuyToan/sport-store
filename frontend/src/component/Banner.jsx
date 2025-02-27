import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners");
      setBanners(res.data);
    } catch (error) {
      console.error("Lỗi khi tải banner:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <p className="text-lg font-semibold">Đang tải...</p>
      </div>
    );
  }

  return (
    <>
      {banners.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-[400px]"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id} className="relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4 transition-opacity duration-500 ease-in-out">
                <h2 className="text-3xl font-bold">{banner.title}</h2>
                <p className="text-lg">{banner.description}</p>
                <a
                  href={banner.link}
                  className="mt-4 bg-red-500 px-6 py-2 rounded transition-transform duration-300 hover:scale-105"
                >
                  Xem ngay
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-lg font-semibold">Không có banner nào</p>
      )}
    </>
  );
};

export default Banner;
