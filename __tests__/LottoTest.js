const Lotto = require("../src/Lotto");

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 숫자가 아닌 것이 포함될 경우 예외가 발생한다", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, k]);
    }).toThrow("[ERROR] 로또 번호는 숫자로만 이루어질 수 있습니다.]");
  });

  test("로또 번호가 1이상 45이하의 숫자로 이루어지지 않는다면 예외가 발생한다", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(
      "[ERROR] 로또 번호는 1이상 45이하의 숫자로만 이루어질 수 있습니다"
    );
  });
});
