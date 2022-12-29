// const fs = require('fs')

const fs = require("node:fs/promises");

async function main() {
  try {
    const data = await fs.readFile("./text.txt", "utf8"); //? { encoding: "utf8" } ---> "utf8"
    console.log(data);
    const data2 = await fs.readFile("./text2.txt", { encoding: "utf8" });
    console.log(data2);

    //? замінює текст в файлі
    // await fs.writeFile("./text2.txt", "Line2");
    // await fs.writeFile("./text2.txt", "Goood 3!!!!!");
    //? додає текст в файл
    // await fs.appendFile(
    //   "./text2.txt",
    //   "3. Избегайте нагромождения – пытайтесь разбивать свой код на столько мелких составных частей, насколько это вообще возможно. И даже больше.\n",
    // );
    // await fs.appendFile(
    //   "./text2.txt",
    //   "4. Используйте асинхронный подход – избегайте синхронное программирование словно чумы.\n",
    // );
    //? видалить файл
    // await fs.unlink('./text.txt')
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
