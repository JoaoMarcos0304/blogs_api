const express = require('express');
const funcsController = require('../controllers/loginController');
const middlewares = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', middlewares.loginValidate, funcsController.postLogin);

module.exports = router;