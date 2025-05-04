import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Kiểm tra người dùng đã đăng nhập

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setReviews(res.data.reviews);
        setSelectedImage(res.data.images?.[0] || "");
        fetchSimilarProducts(res.data.category); // Lấy sản phẩm tương tự
        setLoading(false);
      } catch (err) {
        setError("Không tìm thấy sản phẩm!");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchSimilarProducts = async (category) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${category}`
      );
      setSimilarProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm tương tự:", err);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu sắc!");
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

  const handleReviewSubmit = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để đánh giá!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/products/${id}/review`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews(res.data.reviews);
      setComment("");
    } catch (err) {
      alert(err.response?.data?.msg || "Lỗi khi gửi đánh giá");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col space-y-4">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product?.name}
              className="w-full h-96 object-contain rounded-lg border"
            />
          )}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain border rounded cursor-pointer hover:border-blue-500 ${
                  selectedImage === img ? "border-blue-500 border-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product?.description}</p>
          <p className="text-xl font-bold text-red-500 mb-4">
            {product?.price?.toLocaleString()} VND
          </p>
          <p className="text-xl font-semibold mb-4 ">
            Loại: {product?.category}
          </p>
          {/* Chọn số lượng */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Số lượng</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="w-20 p-2 border rounded"
            />
          </div>

          {/* Chọn size */}
          <div className="flex flex-wrap gap-2">
            <label className="block mb-1 font-medium">Chọn size</label>
            <div className="flex space-x-2">
              {product?.sizes?.map((size) => (
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
          <div className="flex flex-wrap gap-2 mt-4">
            <label className="block mb-1 font-medium">Chọn màu sắc</label>
            <div className="flex space-x-2">
              {product?.colors?.map((color) => (
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
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 w-full md:w-auto"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full md:w-auto"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Đánh giá sản phẩm</h2>
        {reviews.length === 0 ? (
          <>
          <p>Chưa có đánh giá nào.</p>
          </>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border p-2 rounded my-2">
              <p className="font-bold">⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
        {user && (
          <div className="mt-4">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 rounded w-full my-2"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} sao
                </option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập đánh giá..."
              className="border p-2 rounded w-full"
            ></textarea>
            <button
              onClick={handleReviewSubmit}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Gửi đánh giá
            </button>
          </div>
        )}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Sản phẩm tương tự</h2>
        {similarProducts.length === 0 ? (
          <p>Không có sản phẩm tương tự.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg hover:shadow-2xl cursor-pointer transition-all transform hover:-translate-y-2 duration-300">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-red-500 font-bold">{item.price.toLocaleString()} VND</p>
                <button
                  onClick={() => {
                    navigate(`/product/${item._id}`)
                    window.scrollTo(0, 0)
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
