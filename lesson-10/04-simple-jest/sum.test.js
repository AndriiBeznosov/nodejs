const { sum } = require("./sum");

describe("sum", () => {
  // виконується на початку теста
  beforeAll(() => {
    console.log("START:  I am running before all test");
  });

  // виконується перед кожним тестом
  beforeEach(() => {
    console.log("I am running before every test");
  });

  // виконується в кінці теста
  afterAll(() => {
    console.log("FINISH: I am running after all test");
  });

  test("1+2 should return 3", () => {
    const resolt = sum(1, 2);
    expect(resolt).toBe(3);
  });
  //запускає тест з позначкою "only", всі інші ігнорує
  test("-2+1 should return -1", () => {
    const resolt = sum(-2, 1);
    expect(resolt).toBe(-1);
  });
  test("'5'+2 should return 7", () => {
    const resolt = sum("5", 2);
    expect(!isNaN(resolt)).toBe(true);
  });
  //відключити тест, якщо не знаешь як його пофіксити - "skip"
  describe("when not a number", () => {
    // it === test
    it.skip("10+20 should return 30", () => {
      const resolt = sum(10, 20);
      expect(resolt).toEqual(30);
    });
  });
});
