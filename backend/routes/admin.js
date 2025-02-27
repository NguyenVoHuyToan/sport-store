const express = require("express");
const auth = require("../middleware/auth");
const authRole = require("../middleware/authRoles");

const router = express.Router();

router.get("/admin/dashborad", auth, authRole("admin"), (req,res) => {
    res.json({msg: "Chao mung Admin!"});
});

module.exports = router;