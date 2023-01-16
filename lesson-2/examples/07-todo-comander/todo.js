//*-------------------------
//* node todo.js add <title>
//* node todo.js remove <id>
//* node todo.js list
//*-------------------------

const { addTodo, removeTodo, listTodo } = require("./db/db");
const { program } = require("commander");

async function invokeAction({ action, title, id, limit }) {
  switch (action) {
    case "add":
      console.log("invoke add", title);
      await addTodo(title);
      break;
    case "remove":
      console.log("invoke remove", id);
      await removeTodo(id);
      break;
    case "list":
      const list = await listTodo({ limit });
      console.table(list);
      break;

    default:
      throw new Error(`unknown action, got: ${action}`);
  }
}

// invokeAction({ action: "add", title: "some todo" + Date.now() });
// invokeAction({ action: "remove", id: "xL7BFkethjfkyPeFXXswv" });
// invokeAction({ action: "list" });

program.command("add <title>").action((options) => {
  const title = options;
  console.log(title);
  invokeAction({ action: "add", title });
});

program
  .command("list")
  .alias("ls")
  .option("-l, --limit <limit>")
  .action((options) => {
    const limit = options.limit;
    console.log("limit", limit);
    invokeAction({ action: "list", limit });
  });

program.command("remove <id>").action((options) => {
  const id = options;
  console.log(id);
  invokeAction({ action: "remove", id });
});

program.parse();
