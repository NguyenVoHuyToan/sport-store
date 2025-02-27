import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarFilter from "../component/SlidebarFilter";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 10000000],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Filters gửi lên:", filters); // Debug filters
    axios
      .get("http://localhost:5000/api/products", { params: filters })
      .then((res) => {
        console.log("Dữ liệu nhận về:", res.data); // Debug response
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err.response?.data || err);
        setError("Không thể tải sản phẩm");
        setLoading(false);
      });
  }, [filters]);

  if (loading) return <p className="text-center">⏳ Đang tải sản phẩm...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex">
      <SidebarFilter filters={filters} setFilters={setFilters} />
      <div className="container mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p className="text-center col-span-4 text-gray-500">
            Không có sản phẩm nào
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border p-2 rounded-lg shadow-lg hover:scale-105 transition"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-red-500">
                {product.price.toLocaleString()} VND
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
