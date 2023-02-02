const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "tmp"),
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "_" + file.originalname);
  },
});
const upload = multer({
  storage,
  //   limits: {
  //     fileSize: 1,
  //   },
});

app.post("/upload", upload.single("image"), async (req, res, next) => {
  console.log("req.file", req.file);
  const { filename } = req.file;
  try {
    const tmpPath = path.resolve(__dirname, "tmp", filename);
    const newPath = path.resolve(__dirname, "public/avatars", filename);
    await fs.rename(tmpPath, newPath);

    res.status(200).json({ message: "OK", file: req.file });
  } catch (error) {
    console.error(
      " ------- error while moving file to public ------- :",
      error,
    );
    res.status(500).json({ message: "Internal ser ver error" });
  }
});

app.post("/upload2", upload.array("image"), async (req, res, next) => {
  try {
    console.log("req.files", req.files);
    res.status(200).json({ data: req.files });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("----------- app is listening on port 3001");
});
