const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (role) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Unauthorized');
        } else {
            const tokenBody = token.slice(7);
            jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send('Unauthorized');
                }
                console.log(decoded.role);
                if (role && role.length > 0) {
                    if (decoded.role == 'admin') {
                        return next();
                    }

                    if (decoded.role && decoded.role.length && decoded.role == role) {
                        return next();
                    } else {
                        return res.status(403).send('Access Denied');
                    }
                } else {
                    next();
                }
            });
        }
    };
};
