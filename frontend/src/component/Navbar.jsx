import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { logout } from "../store/authSlice";
import Modal from "./Modal";
import axios from "axios";
const Navbar = () => {
  const { category } = useParams();
  const title = [
    {
      title: "Trang Chủ",
      href: "/",
    },
    {
      title: "Sản Phẩm ",
      href: "/products",
    },
  ];

  const cartCount = useSelector((state) => state.cart.items.length);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchProducts(searchTerm);
      } else {
        setSearchResults([]); // tra ve mang rong khi input trong
      }
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  //tim san pham

  const searchProducts = async (query) => {
    if (!query) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`
      );
      setSearchResults(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold px-4 py-2">
        🏀 Sports Shop
      </Link>
      {title.map((item,index) => {
        return (
          <Link
            key={index}
            className="flex justify-between text-white items-center gap-3 text-lg"
            to={item.href}
          >
            {item.title}
          </Link>
        );
      })}
      <div className="relative w-[300px]">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full text-black border-none focus:outline-none"
        />
        <button
          onClick={() => {
            const query = searchTerm.trim();
            if (query !== "") searchProducts(query);
          }}
          className="absolute right-4 top-2.5 text-gray-500 cursor-pointer"
        >
          🔍
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={searchResults}
        />
      </div> 

      {user ? (
        <div>
          <span className="mr-4">👤 {user.name}</span>
          {user && user.role === "admin" && (<Link to="/admin/dashboard" className="bg-yellow-500 px-4 py-2 mr-2 rounded text-center">Admin</Link>)}
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 px-4 py-2 mr-2 rounded"
          >
            Đăng xuất
          </button>

          <Link to="/cart" className="bg-blue-500 px-4 py-2 rounded">
            🛒 ({cartCount})
          </Link>
        </div>
      ) : (
        <div className=" ml-2 px-2 py-2 ">
          <Link to="/login" className="bg-blue-500 px-4 py-2 mr-2 rounded">
            Đăng nhập
          </Link>
          <Link to="/register" className="bg-green-500 px-4 py-2 rounded">
            Đăng ký
          </Link>
          <Link to="/cart" className="bg-blue-500 ml-2 px-1 py-2 rounded">
            🛒({cartCount})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
