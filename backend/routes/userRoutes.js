const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const User = require("../model/User"); // Import model User

const router = express.Router();

// 📌 API lấy thông tin thanh toán của user
router.get("/checkout-info/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      phone: user.phone,
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 API cập nhật thông tin thanh toán của user
router.put("/checkout-info/:userId", async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, phone, address },
      { new: true, upsert: true }
    );
    res.json({ message: "User info updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
