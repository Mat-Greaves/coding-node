const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');
  console.log('this is token', token);
  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecretKey'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
