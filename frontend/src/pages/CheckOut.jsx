import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Checkout = () => {
  const user = useSelector((state) => state.auth.user);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/checkout-info/${user.id}`)
        .then((res) => {
          if (res.data) {
            setCheckoutInfo(res.data);
          }
        })
        .catch((err) => console.error("Lỗi tải thông tin thanh toán:", err));
    }
  }, [user]);

  const handleChange = (e) => {
    setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      axios.put(`http://localhost:5000/api/checkout-info/${user.id}`, checkoutInfo)
        .then(() => alert("Thông tin đã được lưu!"))
        .catch((err) => console.error("Lỗi lưu thông tin:", err));
    }
  };

  const handleCheckout = () => {
    console.log("Thanh toán với thông tin:", checkoutInfo);
    // Thực hiện logic thanh toán ở đây
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Tên</label>
        <input
          type="text"
          name="name"
          value={checkoutInfo.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Số điện thoại</label>
        <input
          type="text"
          name="phone"
          value={checkoutInfo.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Địa chỉ giao hàng</label>
        <input
          type="text"
          name="address"
          value={checkoutInfo.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Lưu thông tin
      </button>
      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Thanh toán
      </button>
    </div>
  );
};

export default Checkout;
