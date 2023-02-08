const { Category } = require('../models');

const updateValid = (req, res, next) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const postValid = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const catValid = async (req, res, next) => {
  const { categoryIds } = req.body;

  const allCategories = await Category.findAll();
  const valid = allCategories.every((cat) => categoryIds.some((i) => cat.dataValues.id === i));

  if (!valid) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = {
  updateValid,
  postValid,
  catValid,
};
