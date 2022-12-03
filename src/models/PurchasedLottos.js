const { Random } = require('@woowacourse/mission-utils');
const Lotto = require('./Lotto');

class PurchasedLottos {
  #list = [];

  constructor(money) {
    this.publish(money);
  }

  publish(money) {
    for (let count = 0; count < money / 1000; count++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const newLotto = new Lotto(numbers);
      this.#list.push(newLotto);
    }
  }

  getCount() {
    return this.#list.length;
  }

  getLottosNumbers() {
    const lottosNumbers = [];

    this.#list.forEach((lotto) => {
      lottosNumbers.push(lotto.getNumbers());
    });

    return lottosNumbers;
  }

  getResult(winningNumbers, bonusNumber) {
    const rankList = [];

    this.#list.forEach((lotto) => {
      rankList.push(lotto.getRank(winningNumbers, bonusNumber));
    });

    return rankList;
  }
}

module.exports = PurchasedLottos;
