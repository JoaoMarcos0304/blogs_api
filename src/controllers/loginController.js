const funcsModel = require('../services/loginService');
const { tokenGenerate } = require('../utils/createToken');

const postLogin = async (req, res) => {
  const { email } = req.body;
  const validEmail = /^\S+@\S+\.\S+$/.test(email);
  const user = await funcsModel.getUser(email);
  
  if (!user || !validEmail) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  
  const token = tokenGenerate(email);
  return res.status(200).json({ token });
};

module.exports = {
  postLogin,
};