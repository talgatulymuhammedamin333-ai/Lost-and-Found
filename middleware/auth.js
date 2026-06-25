const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "Нет токена" });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Токен не найден" });
    }


    console.log('Authorization:', authHeader);
    console.log('Token:', token);

    try {

        const decoded = jwt.verify(token, secret)

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(403).json({ message: "Неверный или просроченный токен" });
    }

}

module.exports = { auth }