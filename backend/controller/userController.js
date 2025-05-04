import User from "../model/User.js";

// Upload Avatar
export const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) return res.status(400).json({ message: "Không tìm thấy file ảnh" });

    const avatarPath = req.file.path.split("\\").join("/"); // chuyển \\ => /

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    user.avatar = avatarPath;
    await user.save();

    res.status(200).json({ avatar: avatarPath });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
