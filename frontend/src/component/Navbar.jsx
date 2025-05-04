import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { logout, updateAvatar } from "../store/authSlice";
import Modal from "./Modal";
import axios from "axios";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart.items.length);
  const user = useSelector((state) => state.auth.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || "default-avatar.png");
  const [loading, setLoading] = useState(false);

  // Update avatar khi reload page
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.avatar) {
      setAvatar(storedUser.avatar);
    }
  }, [user]);

  const handleAvatarChange = async (event) => {
    const API_URL = "http://localhost:5000";
    const file = event.target.files[0];
    if (!file) return toast.error("❌ Không có file nào được chọn!");

    let userId = user?._id || JSON.parse(localStorage.getItem("user"))?._id;

    if (!userId) {
      toast.error("❌ Bạn cần đăng nhập trước khi đổi avatar!");
      return navigate("/login");
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userId);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/user/upload-avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);

      setAvatar(`${API_URL}${data.avatar}`);
      dispatch(updateAvatar(`${API_URL}${data.avatar}`));

      const updatedUser = {
        ...user,
        avatar: `${API_URL}${data.avatar}`,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("✅ Cập nhật ảnh đại diện thành công!");
    } catch (error) {
      setLoading(false);
      toast.error("❌ Lỗi khi tải ảnh lên!");
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          🏀 Sports Shop
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex space-x-20">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-400 transition">
              Sản Phẩm
            </Link>
          </li>
        </ul>

        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px] px-4 py-2 rounded-full text-black border-none focus:outline-none"
          />
          <button
            onClick={() => searchTerm.trim() && setIsModalOpen(true)}
            className="absolute right-4 top-2.5 text-gray-500 cursor-pointer"
          >
            <Search size={20} />
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

        {/* User + Cart */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                <label htmlFor="avatarInput" className="block w-full h-full">
                  {loading ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <ClipLoader size={20} color="#000" />
                    </div>
                  ) : (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </label>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
                Đăng nhập
              </Link>
              <Link to="/register" className="bg-green-500 px-3 py-1 rounded">
                Đăng ký
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="bg-blue-500 px-3 py-1 rounded flex items-center gap-1"
          >
            <ShoppingCart size={20} /> ({cartCount})
          </Link>
        </div>

        {/* Mobile menu */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
