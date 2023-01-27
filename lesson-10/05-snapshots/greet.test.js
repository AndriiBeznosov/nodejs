const { greet } = require("./greet");

describe("greet", () => {
  test("should return greeting", () => {
    const resolt = greet();
    expect(resolt).toMatchInlineSnapshot(`"Hello!!! OK"`);
  });
});
