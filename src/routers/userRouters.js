const express = require('express');
const funcsController = require('../controllers/userController');
const JWTValidate = require('../middlewares/JWTValidate');
const middlewares = require('../middlewares/userValidations');

const router = express.Router();

router.post('/', middlewares.postUserValid, funcsController.postUser);
router.get('/', JWTValidate, funcsController.getUsers);
router.get('/:id', JWTValidate, funcsController.getById);
router.delete('/me', JWTValidate, funcsController.deleteUser);

module.exports = router;