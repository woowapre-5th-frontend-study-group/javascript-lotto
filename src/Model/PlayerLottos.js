const Lotto = require('./Lotto');
const { Random } = require('@woowacourse/mission-utils');
const { MONEY, LOTTO, PLACE } = require('../libs/const');

class PlayerLottos {
  constructor(money) {
    this.list = [];

    this.publish(money);
  }

  publish(money) {
    for (let num = 0; num < money / MONEY.UNIT; num++) {
      const newLotto = this.createNewLotto();
      this.list.push(newLotto);
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
    return this.list.length;
  }

  getLottos() {
    const lottos = [];

    this.list.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();

      lottos.push(lottoNumbers);
    });

    return lottos;
  }

  getRanks(winningNumbers, bonusNumber) {
    let lottoRanks = [];

    this.list.forEach((lotto) => {
      lottoRanks.push(lotto.getRank(winningNumbers, bonusNumber));
    });

    return lottoRanks.filter((rank) => rank <= PLACE.LAST);
  }
}

module.exports = PlayerLottos;
