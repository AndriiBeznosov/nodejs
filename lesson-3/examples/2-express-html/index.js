const express = require("express");
const app = express();

app.get("/movies", (require, response) => {
  response.send(
    '<h1 style="font-size:64px; color: rgb(0,0,255)">Movies page</h1>',
  );
});

app.get("/", (require, response) => {
  response.send(
    '<h1 style="font-size:64px; color:rgb(111,45,255)">Home page</h1>',
  );
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !!!");
});
