const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.resolve(__dirname, "./db.json");

async function readDb() {
  const dbRow = await fs.readFile(dbPath);
  const db = JSON.parse(dbRow);
  return db;
}
async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

async function addMovie(name) {
  const id = nanoid();
  const movie = { id, name };
  const db = await readDb();
  db.push(movie);
  await writeDb(db);
  return movie;
}

async function patchMovie(id, item) {
  const db = await readDb();
  const [updateMovie] = db.filter((el) => el.id === id);
  updateMovie.year = item;
  await writeDb(db);
  return updateMovie;
}

async function removeMovie(id) {
  const db = await readDb();
  const updateDb = db.filter((todo) => todo.id !== id);
  await writeDb(updateDb);
}

async function listMovies({ limit = 0 }) {
  const db = await readDb();
  return db.slice(-limit);
}

async function getMovies(id) {
  const db = await readDb();
  const movie = db.find((m) => m.id === id);
  return movie || null;
}

module.exports = {
  addMovie,
  removeMovie,
  listMovies,
  getMovies,
  patchMovie,
};
