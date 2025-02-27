import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Thanh toán thành công!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold py-2">Thanh toán</h1>
      {cart.length === 0 ? (
        <p>Không có sản phẩm nào để thanh toán</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between p-2 border-b">
                <div>
                  <img
                    className="w-full h-40 object-contain rounded"
                    src={item.image}
                  ></img>
                  <h2 className="py-2 text-red-500">{item.name}</h2>
                  <p className="py-2 text-red-600 font-semibold">
                    {item.price.toLocaleString()} VND x {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4 text-center py-2">
            Tổng tiền: {totalPrice.toLocaleString()} VND
          </h2>
          <div className="flex justify-center ">
            <button
              onClick={handlePayment}
              className=" bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
