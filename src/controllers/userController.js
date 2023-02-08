const funcsService = require('../services/userServices');
const { tokenGenerate } = require('../utils/createToken');

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const user = await funcsService.getUser(email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  await funcsService.insertUser({ displayName, email, password, image });
  const token = tokenGenerate(email);
  return res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  const allUsers = await funcsService.getAllUsers();
  console.log(allUsers);

  return res.status(200).json(allUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await funcsService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { data } = req.user;

  await funcsService.deleteUser(data);

  return res.status(204).end();
};

module.exports = {
  postUser,
  getUsers,
  getById,
  deleteUser,
};