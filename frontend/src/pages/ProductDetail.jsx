import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu sắc trước khi thêm vào giỏ hàng!");
      return;
    }
    dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      handleAddToCart();
      navigate("/checkout");
    }
  };

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col space-y-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg border"
          />
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-20 h-20 object-contain border rounded cursor-pointer hover:border-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-red-500 mb-4">
            {product.price?.toLocaleString()} VND
          </p>

          {/* Chọn số lượng */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Số lượng</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-20 p-2 border rounded"
            />
          </div>

          {/* Chọn size */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Chọn size</label>
            <div className="flex space-x-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded ${
                    selectedSize === size ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn màu sắc */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Chọn màu sắc</label>
            <div className="flex space-x-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-4 py-2 rounded ${
                    selectedColor === color ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
