//*-------------------------
//* node todo.js add <title>
//* node todo.js remove <id>
//* node todo.js list
//*-------------------------

const { addTodo, removeTodo, listTodo } = require("./db/db");

async function invokeAction({ action, title, id }) {
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
      const list = await listTodo();
      console.table(list);
      break;

    default:
      throw new Error(`unknown action, got: ${action}`);
  }
}

// invokeAction({ action: "add", title: "some todo" + Date.now() });
// invokeAction({ action: "remove", id: "xL7BFkethjfkyPeFXXswv" });
// invokeAction({ action: "list" });

const [, , action] = process.argv;

switch (action) {
  case "add":
    const [, , , ...title] = process.argv;
    invokeAction({ action, title: title.join(" ") });
    break;

  case "remove":
    const [, , , id] = process.argv;
    invokeAction({ action, id });
    break;

  case "list":
    invokeAction({ action });
    break;
  default:
    break;
}
