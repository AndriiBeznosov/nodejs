const { nanoid } = require("nanoid");

const { HttpError } = require("../httpError");

let posts = [
  {
    id: "1",
    topic: "express.json",
    text: "express.json()это метод, встроенный в экспресс, для распознавания входящего объекта запроса как объекта JSON . Этот метод вызывается как промежуточное ПО в вашем приложении с помощью кода:app.use(express.json());",
  },
  {
    id: "2",
    topic: "express.urlencoded",
    text: "express.urlencoded()это встроенный в выражение метод для распознавания входящего объекта запроса как строки или массива . Этот метод вызывается как промежуточное ПО в вашем приложении с помощью кода:app.use(express.urlencoded());",
  },
];

const getPosts = (req, res) => {
  res.json({ status: "success", posts });
};

const getPostsById = (req, res) => {
  try {
    const [post] = posts.filter((item) => item.id === req.params.id);
    if (!post) {
      throw new HttpError(
        `The contact with this id: ${req.params.id} is not on the list`,
        400,
      );
    }
    res.json({ message: "success", post });
  } catch (error) {
    return res.status(error.code).json({
      message: error.message,
    });
  }
};

const addPost = (req, res) => {
  const { topic, text } = req.body;
  const idPost = nanoid();
  posts.push({
    id: idPost,
    topic,
    text,
  });
  const post = posts.find((it) => it.id === idPost);

  res.json({ statusContact: { message: "Added contact !!!" }, post });
};

const changePost = (req, res) => {
  try {
    const post = posts.find((item) => item.id === req.params.id);
    if (!post) {
      throw new HttpError(
        `The contact with this id: '${req.params.id}' is not on the list`,
        400,
      );
    }

    const { topic, text } = req.body;

    posts.forEach((post, index) => {
      if (post.id === req.params.id) {
        (post.topic = topic), (post.text = text);
      }
    });

    res.json({ statusContact: { message: "Contact update !!!" }, post });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

const updatePost = (req, res) => {
  try {
    const post = posts.find((item) => item.id === req.params.id);
    if (!post) {
      throw new HttpError(
        `The contact with this id: '${req.params.id}' is not on the list`,
        400,
      );
    }

    const { topic, text } = req.body;

    posts.forEach((post) => {
      if (post.id === req.params.id) {
        if (topic) {
          post.topic = topic;
        }
        if (text) {
          post.text = text;
        }
      }
    });

    res.json({ statusContact: { message: "Contact update !!!" }, post });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

const deletePost = (req, res) => {
  try {
    const post = posts.find((item) => item.id === req.params.id);
    if (!post) {
      throw new HttpError(
        `The contact with this id: '${req.params.id}' is not on the list`,
        400,
      );
    }
    posts = posts.filter((item) => item.id !== req.params.id);
    res.json({ message: "Delete contact !!!" });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPosts,
  getPostsById,
  addPost,
  changePost,
  updatePost,
  deletePost,
};
