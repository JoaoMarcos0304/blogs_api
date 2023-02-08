const { User } = require('../models');

const insertUser = async (info) => {
  const { displayName, email, password, image } = info;
  await User.create({ displayName, email, password, image });
  return 201;
};

const getUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const getById = async (id) => {
  const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { id } });
  return user;
};

const deleteUser = async (email) => {
  User.destroy({ where: { email } });
};

module.exports = {
  insertUser,
  getUser,
  getAllUsers,
  getById,
  deleteUser,
};