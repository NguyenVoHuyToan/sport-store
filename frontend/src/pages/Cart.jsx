import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleSelectAll,
  toggleSelectItem,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import React from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const selectedAll = useSelector((state) => state.cart.selectedAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedTotalPrice = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);


  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống</p>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={selectedAll}
              onChange={() => dispatch(toggleSelectAll())}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-lg font-semibold">
              {selectedAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </span>
          </div>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between p-2 border-b">
                 <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => dispatch(toggleSelectItem(item._id))}
                  className="w-4 h-4 cursor-pointer"
                />
                <div>
                  <img
                    className="w-50 h-20 object-contain"
                    src={item.image}
                    alt={item.name}
                  />
                  <h2 className="py-2 text-red-600">{item.name}</h2>
                  <p className="py-2 text-blue-800">
                    {item.price.toLocaleString()} VND x {item.quantity}
                  </p>
                  <div className="flex py-1">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="bg-gray-300 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="bg-gray-300 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="w-20 h-10 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">
            Tổng tiền: {selectedTotalPrice.toLocaleString()} VND
          </h2>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            disabled={selectedTotalPrice === 0}
          >
            Thanh toán
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
