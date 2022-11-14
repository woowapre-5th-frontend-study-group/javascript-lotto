const { Random } = require("@woowacourse/mission-utils");
const { PRINT_MESSAGE } = require("./lib/constants");

class UserLotto {
  count;
  numbers = [];
  constructor(purchaseAmout) {
    this.validate(purchaseAmout);
    this.count = Number(purchaseAmout) / 1000;
    this.getNumbers();
  }

  validate(purchaseAmout) {
    if (!isNaN(purchaseAmout)) {
      return;
    }
    throw new Error(PRINT_MESSAGE.ERROR("올바른 숫자를 입력해주세요."));
  }

  getNumbers() {
    for (let count = 1; count <= this.count; count++) {
      const autoSelectLottoNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.numbers.push(autoSelectLottoNumber);
    }
  }
}

module.exports = UserLotto;
