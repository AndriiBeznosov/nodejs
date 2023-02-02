const express = require("express");

const router = express.Router();

// router.get("/api/humans", (req, res, next) => {
//   res.json({
//     posts: [
//       { name: "Andrii", a: 22 },
//       { name: "Den", a: 24 },
//     ],
//   });
// });

router
  .route("/humans")
  .get((req, res, next) => {
    res.json({
      posts: [
        { name: "Andrii", a: 22 },
        { name: "Den", a: 24 },
      ],
    });
  })
  .post((req, res, next) => {
    console.log(req.body);
    res.status(201).json(req.body);
  });

router.route("/humans/:humanId/:id").delete((req, res, next) => {
  // res.status(200).json({ abs: "abs" });
  const { humanId, id } = req.params;
  console.log(humanId, id);
  res.end();
});

module.exports = {
  router,
};
