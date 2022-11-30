const Lotto = require('./Lotto');
const checkValue = require('../libs/checkValue');
const exitWithError = require('../libs/exitWithError');
const { Random } = require('@woowacourse/mission-utils');
const { MONEY, LOTTO, PRIZE, WINNING_DETAIL, PLACE } = require('../libs/const');

class PurchasedLottos {
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

  getWinningDetails(lottoRanks) {
    const winningDetails = [
      WINNING_DETAIL.FIFTH,
      WINNING_DETAIL.FOURTH,
      WINNING_DETAIL.THIRD,
      WINNING_DETAIL.SECOND,
      WINNING_DETAIL.FIRST,
    ];

    winningDetails.forEach((winningDetail, idx) => {
      const winningCount = this.getWinningCount(lottoRanks, idx);

      winningDetails[idx] = `${winningDetail} - ${winningCount}개`;
    });

    return winningDetails;
  }

  getLottoRate(lottoRanks) {
    return this.calculateRate(lottoRanks);
  }

  calculateRate(lottoRanks) {
    const lottePrizes = [
      PRIZE.FIFTH,
      PRIZE.FOURTH,
      PRIZE.THIRD,
      PRIZE.SECOND,
      PRIZE.FIRST,
    ];
    const finalPrize = lottePrizes.reduce((acc, cur, idx) => {
      const winningCount = this.getWinningCount(lottoRanks, idx);

      return acc + cur * winningCount;
    }, 0);

    const purchaseMoney = this.calculateCount() * MONEY.UNIT;

    return ((finalPrize / purchaseMoney) * 100).toFixed(1);
  }

  getWinningCount(lottoRanks, idx) {
    return lottoRanks.filter((rank) => rank === 5 - idx).length;
  }

  calculateCount() {
    return this.list.length;
  }
}

module.exports = PurchasedLottos;
