import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen w-full bg-gradient-to-l from-purple-900 to-gray-800 flex justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-slide">
        <div className="bg-blur"></div>
      </div>
      <div className="bg-white bg-opacity-10 border border-gray-500 rounded-xl p-8 w-[400px] shadow-lg backdrop-blur-md">
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          Đăng Ký
        </h1>
        <div className="mb-4">
          <label className="text-white block mb-2">Tên</label>
          <input
            className="w-full p-3 border-b border-white bg-transparent text-white placeholder-gray-300 focus:outline:-none"
            type="text"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <lable className="text-white block mb-2">Email</lable>
          <input
            className="w-full p-3 border-b border-white bg-transparent text-white placeholder-gray-300 focus:outline:-none"
            type="email"
            placeholder="Nhập email đăng ký (vd: helo123@...)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-white block mb-2">Mật Khẩu</label>
          <input
            className="w-full p-3 border-b border-white bg-transparent text-white placeholder-gray-300 focus:outline:-none"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-white text-black rounded-full mt-3 py-3 font-semibold hover:bg-gray-200 transition-all"
        >
          Đăng Ký
        </button>
        <p className="text-white text-center mt-4">
          Bạn đã có tài khoản ? 
          <a href="/login" className="font-semibold hover:text-gray-300 ml-2">Đăng Nhập</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
