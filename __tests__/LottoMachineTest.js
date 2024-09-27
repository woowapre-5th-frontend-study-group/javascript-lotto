const LottoMachine = require("../src/LottoMachine");

describe("로또머신 클래스 테스트", () => {
  test("구입금액이 숫자가 아닌경우 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine("1000j");
    }).toThrow("[ERROR] 구매 금액은 숫자이어야 합니다.");
  });

  test("구입금액이 1000원으로 나누어 떨어지지 않는 경우 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine("10042");
    }).toThrow("[ERROR] 구매 금액의 단위는 1000원입니다.");
  });

  test("구입금액이 1000원 미만인 경우 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine("800");
    }).toThrow("[ERROR] 구매 금액은 1000원 이상이어야 합니다.");
  });
});
