import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      dispatch(loginSuccess(data)); // Đăng nhập ngay sau khi đăng ký thành công
      navigate("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-start items-center bg-gray-100">
      <div className="w-full px-4 py-2 text-gray-600">
        <a href="/" className="hover:underline">
          Trang chủ
        </a>
        <span className="mx-2">{">"}</span>
        <span className="text-gray-800">Đăng ký tài khoản</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h1 className="text-center text-red-600 text-2xl font-bold mb-4">
          ĐĂNG KÝ
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Đã có tài khoản,{" "}
          <a href="/login" className="text-red-500 font-semibold">
            đăng nhập tại đây
          </a>
        </p>
        <div className="mb-3">
          <input
            className="w-full p-3 border rounded-lg"
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-full p-3 border rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-full p-3 border rounded-lg"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <motion.button
          onClick={handleRegister}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-red-600 text-white rounded-lg py-3 font-semibold hover:bg-red-700 transition-all"
        >
          ĐĂNG KÝ
        </motion.button>
        <p className="text-center text-gray-600 mt-4">Hoặc đăng nhập bằng</p>
        <div className="flex justify-center gap-4 mt-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg">
            <i className="fab fa-facebook"></i> Facebook
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg">
            <i className="fab fa-google"></i> Google
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
