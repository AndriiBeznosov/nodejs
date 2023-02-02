const express = require('express');
const { router } = require('./router/index');

const app = express();

app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
// app.use("/", (req, res, next) => {
//   console.log("Hello my middleware!!!");
//   next();
// });

// app.use("/", (req, res, next) => {
//   console.log("Hello my middleware!!! 222222");
// });

module.exports = {
  app,
};
