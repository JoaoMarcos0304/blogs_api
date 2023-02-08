require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerate = (info) => {
  const token = jwt.sign({ data: info }, secret, jwtConfig);
  return token;
};

module.exports = {
  tokenGenerate,
};