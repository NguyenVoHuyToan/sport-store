import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HighlightProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/highlight"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching highlight products:", err);
        setError(err.response?.data || "Không thể tải sản phẩm nổi bật.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto my-8 max-w-6xl">
      <h2 className="text-2xl font-bold text-center mb-6">Sản phẩm nổi bật</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border p-4 rounded-lg hover:shadow-2xl cursor-pointer transition-all transform hover:-translate-y-2 duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">
              {product.price.toLocaleString()} VND
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HighlightProducts;
