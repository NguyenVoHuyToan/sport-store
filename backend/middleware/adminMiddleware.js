const auth = require("./auth");

const adminMiddleware = (req, res, next) => {
    auth(req, res, () => {
      if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin access only" });
      next();
    });
  };

module.exports = adminMiddleware;