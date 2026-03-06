const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log("JWT_SECRET:", process.env.JWT_SECRET)
    console.log("TOKEN:", token)

    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded.userId;
            next()

        } catch (error) {
            res.status(401).json({ message: 'Yetkisiz erişim, token geçersiz!' });
        }
    } else {
        res.status(401).json({ message: 'Token bulunamadı, lütfen giriş yapın.' });
    }


}


module.exports = authMiddleware;