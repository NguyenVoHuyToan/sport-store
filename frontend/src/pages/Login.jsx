import React, { Children, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try{
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token",data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(loginSuccess(data));
        if(data.user.role === "admin"){
          navigate("/admin/dashboard");
        }else {
          navigate("/");
        };
      }else {
        alert(data.msg || "Đăng nhập thất bại");
      }
    }catch (error) {
      alert("Xảy ra lỗi, vui lòng thử lại");
      console.log(error);
    } finally {
      setLoading(false)
    }
};

  return (
    <div className="h-screen w-full bg-gradient-to-l from-purple-900 to-gray-800 flex justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-slide">
        <div className="bg-blur"></div>
      </div>
      <div className="bg-white bg-opacity-10 border border-gray-500 rounded-xl p-8 w-[400px] shadow-lg backdrop-blur-md">
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          Đăng nhập
        </h1>
        <div className="mb-4">
          <lable className="text-white block mb-2">Tài Khoản (Email) </lable>
          <input
            className="w-full p-3 border-b border-white bg-transparent text-white placeholder-gray-300 focus:outline:-none"
            type="text"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <lable className="text-white block mb-2">Mật Khẩu</lable>
          <input
            className="w-full p-3 border-b border-white bg-transparent text-white placeholder-gray-300 focus:outline:-none"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-200"
          } text-black rounded-full mt-3 py-3 font-semibold transition-all`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <p className="text-white text-center mt-4">
          Bạn chưa có tài khoản ? 
          <a href="/register" className="font-semibold hover:text-gray-300 ml-2 underline">Đăng ký</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
