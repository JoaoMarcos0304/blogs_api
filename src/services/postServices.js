const { BlogPost, User, Category, PostCategory } = require('../models');
const userService = require('./userServices');

const getPosts = async () => {
  const all = await BlogPost.findAll({
    include: [
      {
        model: User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories', through: { attributes: [] },
      },
    ],
  });

  return all;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
        model: User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories', through: { attributes: [] },
      },
    ],
  });

  return post;
};

const putPost = async (title, content, id) => {
  try {
    await BlogPost.update(
      {
        title,
        content,
      },
      { where: { id } },
    );

    const result = getPostById(id);
    return result;
  } catch (e) {
    console.log(e);
  }
};

const deletePost = async (id) => {
  BlogPost.destroy({ where: { id } });
};

const postAdd = async ({ data, title, content, categoryIds }) => {
  const ids = categoryIds;
  const { id } = await userService.getUser(data);

  const response = await BlogPost.create({ userId: id, title, content });
  const idPost = response.dataValues.id;
  await Promise.all(ids.map((i) => PostCategory.create({ categoryId: i, postId: idPost })));

  return response;
};

const getSeach = async (q) => {
  const allPosts = await getPosts();

  if (!q) return allPosts;

  const resp = allPosts.filter((p) => p.title.includes(q) || p.content.includes(q));
  return resp;
};

module.exports = {
  getPosts,
  getPostById,
  putPost,
  deletePost,
  postAdd,
  getSeach,
};
