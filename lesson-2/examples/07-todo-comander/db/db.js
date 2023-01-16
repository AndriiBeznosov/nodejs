const fs = require("fs/promises");
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

async function addTodo(title) {
  const id = nanoid();
  console.log(id);
  const todo = { id, title };
  const db = await readDb();
  db.push(todo);
  await writeDb(db);
}

async function removeTodo(id) {
  const db = await readDb();
  const updateDb = db.filter((todo) => todo.id !== id);
  await writeDb(updateDb);
}

async function listTodo({ limit }) {
  const db = await readDb();
  return db.slice(-limit || 0);
}

module.exports = {
  addTodo,
  removeTodo,
  listTodo,
};
