import { useEffect, useState, useMemo, useCallback, Suspense, lazy } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Lazy load SidebarFilter
const SidebarFilter = lazy(() => import("../component/SlidebarFilter"));

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 10000000],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Fetch products with filters
  const fetchProducts = useCallback(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/products", { params: filters })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err.response?.data || err);
        setError("Không thể tải sản phẩm");
        setLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderedProducts = useMemo(() => {
    if (loading) {
      return [...Array(8)].map((_, index) => (
        <div
          key={index}
          className="border p-2 rounded-lg shadow-lg animate-pulse bg-gray-200 h-64"
        />
      ));
    }
    if (error) {
      return <p className="text-center text-red-500 col-span-4">{error}</p>;
    }
    if (products.length === 0) {
      return (
        <p className="text-center col-span-4 text-gray-500">
          Không có sản phẩm nào
        </p>
      );
    }
    return products.map((product) => (
      <motion.div
        key={product._id}
        className="border p-2 rounded-lg shadow-lg hover:scale-105 transition max-h-64"
        whileHover={{ scale: 1.05 }}
      >
        <Link to={`/product/${product._id}`}>
          <img
            src={
              Array.isArray(product.images) ? product.images[0] : product.images
            }
            alt={product.name}
            className="w-full h-40 object-cover rounded-md"
            loading="lazy" // Lazy load hình ảnh
          />
        </Link>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-red-500">{product.price.toLocaleString()} VND</p>
      </motion.div>
    ));
  }, [loading, error, products]);

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-4">
      {/* Sidebar bên trái trên desktop */}
      <div className="hidden md:block w-1/4">
        <Suspense fallback={<p>⏳ Đang tải bộ lọc...</p>}>
          <SidebarFilter filters={filters} setFilters={setFilters} />
        </Suspense>
      </div>

      {/* Mobile sidebar (có nút mở sidebar) */}
      <div className="md:hidden w-full">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 w-full"
        >
          {isMobileSidebarOpen ? "Đóng bộ lọc" : "Mở bộ lọc"}
        </button>

        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            <div className="bg-white w-4/5 h-full p-4 shadow-lg overflow-y-auto">
              <h2 className="text-lg font-semibold">Bộ lọc</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-red-500 text-lg font-bold absolute top-2 right-4"
              >
                ✖
              </button>
              <Suspense fallback={<p>⏳ Đang tải bộ lọc...</p>}>
                <SidebarFilter filters={filters} setFilters={setFilters} />
              </Suspense>
            </div>
          </div>
        )}
      </div>

      {/* Danh sách sản phẩm bên phải */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {renderedProducts}
      </div>
    </div>
  );
};

export default Home;
