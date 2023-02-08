const { Category } = require('../models');

const postCategory = async (name) => {
  await Category.create({ name });
};

const getCategory = async (name) => {
  const category = await Category.findOne({ where: { name } });
  return category;
};

const getAllCategory = async () => {
  const allCategory = await Category.findAll();
  return allCategory;
};

module.exports = {
  postCategory,
  getCategory,
  getAllCategory,
};