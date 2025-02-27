const jwt = require("jsonwebtoken");

const JWT_SECRET = "03112022"; // Thay bằng secret key của bạn

// Middleware để xác thực token
const auth = (req, res, next) => {
  const token = req.header.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Không có token, truy cập bị từ chối" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token không hợp lệ" });
  }
};



module.exports = auth;


