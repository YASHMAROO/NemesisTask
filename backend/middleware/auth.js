const jwt=require('jsonwebtoken');
const config=process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).json({message: "A token is required for authentication"});
    }
    try {
        const tokenSplit = token.split(' ')[1];
        const decoded = jwt.verify(tokenSplit, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({message: "Invalid Token", error: err, token: token});
    }
    return next();
}

module.exports = verifyToken;