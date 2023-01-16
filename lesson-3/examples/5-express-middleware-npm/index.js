const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));

const movies = [
  { id: 1, name: "The GodFather" },
  { id: 2, name: "Super Man" },
];

app.get("/movies", (request, response) => {
  response.json(movies);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !!!");
});
