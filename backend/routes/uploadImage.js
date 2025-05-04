const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose"); // thiếu import này
const sharp = require("sharp"); // thiếu import này
const fs = require("fs");
const User = require("../models/User");
const path = require("path");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("✅ Tạo thư mục uploads thành công!");
}

// Cấu hình lưu trữ file với Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

// API upload avatar
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "User ID không hợp lệ" });
        }

        if (!req.file) {
            return res.status(400).json({ msg: "Vui lòng chọn ảnh" });
        }

        const filename = `resized-${Date.now()}-${req.file.originalname}`;
        const resizedPath = path.join(uploadDir, filename);

        await sharp(req.file.path).resize(300, 300).toFile(resizedPath);
        fs.unlinkSync(req.file.path); // Xoá ảnh gốc

        const avatarPath = `/uploads/${filename}`;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: avatarPath },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ msg: "User không tồn tại" });

        res.json({ msg: "Cập nhật avatar thành công", avatar: updatedUser.avatar });
    } catch (error) {
        console.error("🔥 Lỗi:", error);
        res.status(500).json({ msg: "Lỗi server" });
    }
});

module.exports = router;
