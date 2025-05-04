import React, { Children, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice";
import { motion } from "framer-motion";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(loginSuccess(data));
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert(data.msg || "Đăng nhập thất bại");
      }
    } catch (error) {
      alert("Xảy ra lỗi, vui lòng thử lại");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start items-center bg-gray-100">
       <div className="w-full px-4 py-2 text-gray-600">
        <a href="/" className="hover:underline">
          Trang chủ
        </a>
        <span className="mx-2">{">"}</span>
        <span className="text-gray-800">Đăng nhập tài khoản</span>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-center text-2xl font-bold text-red-600 mb-4">ĐĂNG NHẬP</h2>
        <div className="border-b-2 border-gray-300 mb-4"></div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition-all"
        >
          ĐĂNG NHẬP
        </motion.button>
        <div className="flex justify-between text-sm mt-4">
          <a href="#" className="text-gray-600 hover:text-red-500">Quên mật khẩu?</a>
          <a href="/register" className="text-gray-600 hover:text-red-500">Đăng ký tại đây</a>
        </div>
        <p className="text-center text-gray-600 mt-4">hoặc đăng nhập qua</p>
        <div className="flex justify-center gap-4 mt-3">
          <button className="bg-blue-700 text-white flex items-center px-4 py-2 rounded">
            <i className="fab fa-facebook mr-2"></i> Facebook
          </button>
          <button className="bg-red-500 text-white flex items-center px-4 py-2 rounded">
            <i className="fab fa-google mr-2"></i> Google
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
