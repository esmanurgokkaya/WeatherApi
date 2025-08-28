const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/httpErrors');

module.exports = function auth(required = true) {
    return (req, res, next) => {
        const header = req.headers.authorization || '';
        const token = header.startsWith('Bearer ' ? header.slice(7) : null);

        if(!token && required) return next(new UnauthorizedError('No token provided'));
        if(!token) return next();

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch (err) {
            next(new UnauthorizedError('Invalid token'));
        }
     };
};