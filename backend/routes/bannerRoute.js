const express = require("express");
const router =  express.Router();
const Product = require("../model/Product");
const Banner  = require("../model/Banner");

router.get("/", async (req, res) => {
    try {
      const banners = await Banner.find();
      res.json(banners);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/products/featured", async (req, res) => {
    try {
      const products = await Product.find({ featured: true }).limit(10);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/products/highlight", async (req, res) => {
    try {
      const products = await Product.find({ highlight: true }).limit(10);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;