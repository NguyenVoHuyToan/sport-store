const authRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) return res.status(403).json({msg: "Bạn không có quyền truy cập"});
        next();
    }
}

module.exports = authRole;