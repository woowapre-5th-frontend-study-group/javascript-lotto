const { Random } = require("@woowacourse/mission-utils");
const { sortAscendingNumbers } = require("./utils");

class UserLotto {
  count;
  numbers = [];
  constructor(purchaseAmout) {
    // purchaseAmout; 유효성 검사
    this.count = Number(purchaseAmout) / 1000;
    this.getNumbers();
  }

  getNumbers() {
    for (let count = 1; count <= this.count; count++) {
      const autoSelectLottoNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.numbers.push(sortAscendingNumbers(autoSelectLottoNumber));
    }
  }
}

module.exports = UserLotto;
