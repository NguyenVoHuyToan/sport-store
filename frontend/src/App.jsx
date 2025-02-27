import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./component/Footer";
import AdminDashBoard from "./pages/AdminDashBoard";
import BlogProduct from "./component/BlogProduct";

const ProtectAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return token && user?.role === "admin" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blog/:category" element={<BlogProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectAdminRoute>
              <AdminDashBoard />
            </ProtectAdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
