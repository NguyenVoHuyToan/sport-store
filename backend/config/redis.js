const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

client.on("error", (err) => console.error("Lỗi Redis:", err));

(async () => {
  await client.connect(); // Bắt buộc cho Redis v4+
})();
// Middleware cache dữ liệu
const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      console.log(`🟢 Cache hit: ${key}`);
      return res.json(JSON.parse(cachedData));
    }
    console.log(`🔴 Cache miss: ${key}`);
    next();
  } catch (error) {
    console.error("Lỗi Redis:", error);
    next();
  }
};

module.exports = { client, cacheMiddleware };
