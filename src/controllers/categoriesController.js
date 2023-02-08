const funcsService = require('../services/categoriesService');

const postCategory = async (req, res) => {
  const { name } = req.body;

  await funcsService.postCategory(name);

  const result = await funcsService.getCategory(name);

  return res.status(201).json(result);
};

const getCategory = async (_req, res) => {
  const allCategory = await funcsService.getAllCategory();

  return res.status(200).json(allCategory);
};

module.exports = {
  postCategory,
  getCategory,
};