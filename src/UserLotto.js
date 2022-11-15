const { Random, Console } = require("@woowacourse/mission-utils");
const { PRINT_MESSAGE } = require("./lib/constants");

class UserLotto {
  purchaseAmout;
  count;
  totalNumbers = [];
  constructor(purchaseAmout) {
    this.validate(purchaseAmout);
    this.getNumbers();
  }

  validate(purchaseAmout) {
    if (!isNaN(purchaseAmout)) {
      this.purchaseAmout = purchaseAmout;
      this.count = Number(purchaseAmout) / 1000;
      return;
    }
    throw new Error(PRINT_MESSAGE.ERROR("올바른 숫자를 입력해주세요."));
  }

  getNumbers() {
    for (let count = 1; count <= this.count; count++) {
      const autoSelectLottoNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.totalNumbers.push(autoSelectLottoNumber);
    }
  }

  printLottoCount() {
    Console.print(PRINT_MESSAGE.PURCHASE_COUNT(this.count));
  }

  printLottoNumbers() {
    this.totalNumbers.forEach((numbers) => {
      Console.print(PRINT_MESSAGE.LOTTO_NUMBERS(numbers));
    });
  }
}

module.exports = UserLotto;
