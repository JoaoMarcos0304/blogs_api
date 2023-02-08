const express = require('express');
const funcsController = require('../controllers/categoriesController');
const JWTValidate = require('../middlewares/JWTValidate');
const middlewares = require('../middlewares/categoryValidation');

const router = express.Router();

router.post('/', JWTValidate, middlewares.postValidation, funcsController.postCategory);
router.get('/', JWTValidate, funcsController.getCategory);

module.exports = router;