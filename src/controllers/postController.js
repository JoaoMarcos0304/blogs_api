const funcsService = require('../services/postServices');
const funcsServiceUser = require('../services/userServices');

const getPosts = async (_req, res) => {
  const allPosts = await funcsService.getPosts();

  console.log(allPosts);

  return res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await funcsService.getPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const putPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const postUp = await funcsService.putPost(title, content, id);

  return res.status(200).json(postUp);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const hasPost = await funcsService.getPostById(id);

  const { data } = req.user;
  const userProfile = await funcsServiceUser.getUser(data);

  if (!hasPost) return res.status(404).json({ message: 'Post does not exist' });
  if (userProfile.id !== hasPost.userId) {
    console.log(userProfile.id);
    console.log(hasPost.userId);
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await funcsService.deletePost(id);
  return res.status(204).end();
};

const postAdd = async (req, res) => {
  const { data } = req.user;
  const { title, content, categoryIds } = req.body;
  const result = await funcsService.postAdd({ data, title, content, categoryIds });
  
  return res.status(201).json(result);
};

const getSeach = async (req, res) => {
  const { q } = req.query;
  const response = await funcsService.getSeach(q);

  return res.status(200).json(response);
};

module.exports = {
  getPosts,
  getPostById,
  putPost,
  deletePost,
  postAdd,
  getSeach,
};
