const express = require("express");
const router = new express.Router();
const { addPostValidation, patchPostValidation } = require("../../schemas");
const {
  getPosts,
  getPostsById,
  addPost,
  changePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { validateBody } = require("../middlewares/validationMiddlewares");

//GET /api/posts
router.get("/", getPosts);

//GET /api/posts/:id - пошук контакту по id
router.get("/:id", getPostsById);

//POST /api/posts - додавання контакту (обов'язково повинні бути text та topic)
router.post("/", validateBody(addPostValidation), addPost);

//PUT /api/posts/:id - оновлення контакту по id
router.put("/:id", validateBody(addPostValidation), changePost);

//PATCH /api/posts/:id - оновлення контакту по id
router.patch("/:id", validateBody(patchPostValidation), updatePost);

//DELETE /api/posts/:id - видалення контакту по id
router.delete("/:id", deletePost);

module.exports = {
  postRouter: router,
};
