const express = require("express");
const morgan = require("morgan");
const app = express();

const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public/file.txt"));
app.use(morgan("tiny"));

// app.use((req, res, next) => {
//   console.log(`${req.method}${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

app.post("/home", (req, res) => {
  if (req.body.goit) {
    return res.status(400).json({ status: "goit parameter is required" });
  }

  res.json({ javascript: "object", body: req.body });
});

// app.post("/home", (req, res) => {
//   res.send("post request");
// });

// app.delete("/home", (req, res) => {
//   res.send("delete request");
// });

// app.use((req, res) => {
//   res.send("middleware request");
//   //   return res.redirect("http://google.com");
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at aserver launch:", err);
  }
  console.log(`Server works at port ${PORT}`);
});
