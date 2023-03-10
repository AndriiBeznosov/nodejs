const { Post } = require("../db/postModel");
const { WrongParametersError } = require("../helpers/errors");

const getPosts = async (userId, { page = 0, limit = 0 }) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find({ userId })
    .select({ __v: 0 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort({ topic: -1 });
  return posts;
};

const getPostById = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId, userId });
  if (!post) {
    throw new WrongParametersError(
      `Failure, no posts with id '${postId}' found!`,
    );
  }
  return post;
};

const addPost = async ({ topic, text }, userId) => {
  const post = new Post({ topic, text, userId });
  await post.save();
};

const changePostById = async (postId, { topic, text }, userId) => {
  await Post.findOneAndUpdate(
    { _id: postId, userId },
    { $set: { topic, text } },
  );
};

const deletePostById = async (postId, userId) => {
  await Post.findOneAndRemove({ _id: postId, userId });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
};
