const jwt = require('jsonwebtoken');
const config = require("../config/auth-config.js");

module.exports = (req, res, next) => {
  try {
    const token = req.get('x-access-token');
    const decodedToken = jwt.verify(token, config.secretToken);
    const username = decodedToken.username;
    if (req.params.id && req.params.id !== username) {
      throw 'Invalid username';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  };
};