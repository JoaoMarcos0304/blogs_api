const express = require('express');
const funcsController = require('../controllers/postController');
const JWTValidate = require('../middlewares/JWTValidate');
const middlewares = require('../middlewares/postValidation');
const userPermission = require('../middlewares/permissionValidate');

const router = express.Router();

router.get('/', JWTValidate, funcsController.getPosts);
router.get('/:id', JWTValidate, funcsController.getPostById);
router.put('/:id', JWTValidate, userPermission.userPermission,
  middlewares.updateValid, funcsController.putPost);
router.delete('/:id', JWTValidate, funcsController.deletePost);

router.post('/', JWTValidate, middlewares.postValid, middlewares.catValid, funcsController.postAdd);
router.get('/search', JWTValidate, funcsController.getSeach);

module.exports = router;