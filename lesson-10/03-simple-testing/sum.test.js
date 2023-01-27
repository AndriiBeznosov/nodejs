const { sum } = require("./sum");

// const resolt = sum(1, 2);
// if (resolt !== 3) {
//   throw new Error(`Expect 3, got "${resolt}"!`);
// }
// console.log("OK");

// const resolt2 = sum(1, -2);
// if (resolt2 !== -1) {
//   throw new Error(`Expect -1, got "${resolt2}"!`);
// }
// console.log("OK");

// const resolt3 = sum("1", 2);
// if (resolt !== -1) {
//   throw new Error(`Expect -1, got "${resolt3}"!`);
// }
// console.log("OK");
//----------------------------------------
describe("sum", () => {
  test("1+2 should return 3", () => {
    const resolt = sum(1, 2);
    expect(resolt).toBe(3);
  });
  test("-2+1 should return -1", () => {
    const resolt = sum(-2, 1);
    expect(resolt).toBe(-1);
  });
  test("'5'+2 should return 7", () => {
    const resolt = sum("5", 2);
    expect(resolt).toBe(7);
  });
});
//-----------------------------------------
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expect ${actual}, got "${expected}"!`);
      }
      console.log("       OK");
    },
  };
}

function describe(text, cb) {
  console.log(`describe: ${text}`);
  cb();
}

function test(text, cb) {
  console.log(`test: ${text}`);
  cb();
}
