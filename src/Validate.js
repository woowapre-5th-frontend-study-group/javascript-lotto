const { PRINT_MESSAGE } = require("./utils/constants");

class Validate {
  static isNumber(string) {
    if (!isNaN(string) && string.trim() !== "") {
      return;
    }
    throw new Error(PRINT_MESSAGE.ERROR("올바른 숫자를 입력해주세요."));
  }

  static isMoneyUnit(money, unit) {
    if (money % unit === 0) {
      return;
    }
    throw new Error(PRINT_MESSAGE.ERROR(`${unit} 단위의 금액을 입력해주세요.`));
  }
}

module.exports = Validate;
