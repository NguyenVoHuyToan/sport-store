import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const token = localStorage.getItem("token"); // Kiểm tra token trong localStorage
    if (!token) {
      navigate("/login"); // Nếu chưa đăng nhập => chuyển đến trang đăng nhập
    } else {
      navigate("/checkout"); // Điều hướng đến trang thanh toán
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between p-2 border-b">
                <div>
                  <img
                    className="w-full h-40 object-contain"
                    src={item.image}
                    alt={item.name}
                  ></img>
                  <h2>{item.name}</h2>
                  <p>
                    {item.price.toLocaleString()} VND x {item.quantity}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className=" h-10  bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">
            Tổng tiền: {totalPrice.toLocaleString()} VND
          </h2>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded "
          >
            Thanh toán
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
