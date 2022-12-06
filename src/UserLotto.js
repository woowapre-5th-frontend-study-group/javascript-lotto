const { Random } = require("@woowacourse/mission-utils");
const { LOTTO } = require("./utils/constants");
const Validate = require("./Validate");

class UserLotto {
  #purchaseAmout;
  #totalNumbers = [];

  constructor(purchaseAmout) {
    this.validate(purchaseAmout);
    this.#purchaseAmout = purchaseAmout;
    this.#setTotalNumbers();
  }

  validate(purchaseAmout) {
    Validate.isNumber(purchaseAmout);
    Validate.isMoneyUnit(purchaseAmout, LOTTO.PURCHASE_UNIT);
  }

  getTotalNumbers() {
    return this.#totalNumbers;
  }

  getPurchaseAmout() {
    return this.#purchaseAmout;
  }

  getCount() {
    return Number(this.#purchaseAmout) / LOTTO.PURCHASE_UNIT;
  }

  #setTotalNumbers() {
    for (let count = 1; count <= this.getCount(); count++) {
      const autoSelectLottoNumber = Random.pickUniqueNumbersInRange(
        LOTTO.NUMBER_RANGE.START,
        LOTTO.NUMBER_RANGE.END,
        LOTTO.NUMBER_RANGE.COUNT
      );
      this.#totalNumbers.push(autoSelectLottoNumber);
    }
  }
}

module.exports = UserLotto;
