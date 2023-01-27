const { lottery } = require("./lottery");
const mockGenerateNumber = jest.fn();

jest.mock("./generateNumber", () => {
  return {
    generateNumber: () => mockGenerateNumber(),
  };
});

describe("lottery", () => {
  beforeAll(() => {
    mockGenerateNumber.mockImplementation(() => 2);
  });

  it("should won when 2", () => {
    const resolt = lottery(2);
    expect(resolt).toBe("You won");
  });
  it.skip("should lost", () => {
    const resolt = lottery(1);
    expect(resolt).toBe("You lost");
  });
});
