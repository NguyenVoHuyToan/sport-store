const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const JWT_SECRET = "03112022"; // change with your secret key

// Register
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json({ errors: error.array() });
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "Email already in use" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const role = email === "admin@gmail.com" ? "admin" : "user";
      user = new User({ name, email, password: hashedPassword, role });

      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, name, email, role: user.role } });
    } catch (error) {
      res.status(500).send("Sever Fault");
    }
  }
);

//Login

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Email is not available" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
