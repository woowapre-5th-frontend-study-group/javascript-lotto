const { Random } = require("@woowacourse/mission-utils");
const { PRINT_MESSAGE, THOUSAND } = require("./lib/constants");
const Validate = require("./Validate");

class UserLotto {
  purchaseAmout;
  count;
  totalNumbers = [];
  constructor(purchaseAmout) {
    this.validate(purchaseAmout);
    this.purchaseAmout = purchaseAmout;
    this.getCount();
    this.getTotalNumbers();
  }

  validate(purchaseAmout) {
    if (
      !isNaN(purchaseAmout) &&
      Validate.isMoneyUnit(purchaseAmout, THOUSAND)
    ) {
      return;
    }
    throw new Error(PRINT_MESSAGE.ERROR("올바른 숫자를 입력해주세요."));
  }

  getCount() {
    this.count = Number(this.purchaseAmout) / THOUSAND;
  }

  getTotalNumbers() {
    for (let count = 1; count <= this.count; count++) {
      const autoSelectLottoNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.totalNumbers.push(autoSelectLottoNumber);
    }
  }
}

module.exports = UserLotto;
