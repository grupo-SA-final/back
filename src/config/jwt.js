const jwt = require('jsonwebtoken');

const JWT_SECRET = 'JNFQ*ASDJN1qd8w1bn7isdg1OND81iN8';
const JWT_EXPIRES_IN = '24h';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  generateToken,
  verifyToken
}; 