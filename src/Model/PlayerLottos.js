const Lotto = require('./Lotto');
const { Random } = require('@woowacourse/mission-utils');
const { MONEY, LOTTO, PLACE } = require('../libs/const');

class PlayerLottos {
  #list;

  constructor() {
    this.#list = [];
  }

  publish(money) {
    for (let num = 0; num < money / MONEY.UNIT; num++) {
      const newLotto = this.createNewLotto();
      this.#list.push(newLotto);
    }
  }

  createNewLotto() {
    const newNumbers = Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.NUMBERS_COUNT
    );

    return new Lotto(newNumbers);
  }

  getCount() {
    return this.#list.length;
  }

  getLottos() {
    return this.#list.map((lotto) => lotto.getNumbers());
  }

  getRanks(winningNumbers, bonusNumber) {
    return this.#list.map((lotto) =>
      lotto.getRank(winningNumbers, bonusNumber)
    );
  }
}

module.exports = PlayerLottos;
