const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.secretkey);
        req.body = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token, authorization denied" });
    }
};

module.exports = authMiddleware;