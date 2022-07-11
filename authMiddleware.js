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
        if (role && role.length > 0) {
          if (role == 'admin') {
            next();
          }
          if (decoded.role && decoded.role.length && decoded.role == role) {
            next();
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
