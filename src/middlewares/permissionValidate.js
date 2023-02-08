const funcsServiceUser = require('../services/userServices');
const funcsServicePost = require('../services/postServices');

const userPermission = async (req, res, next) => {
  const { id } = req.params;
  const postId = await funcsServicePost.getPostById(id);

  if (!postId) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  const { data } = req.user;
  const userProfile = await funcsServiceUser.getUser(data);

  if (userProfile.id !== postId.userId) {
    return res.status(401).json({
      message: 'Unauthorized user',
    });
  }

  next();
};

module.exports = {
  userPermission,
};