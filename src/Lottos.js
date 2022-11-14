const { Console, Random } = require('@woowacourse/mission-utils');
const Lotto = require('./Lotto');
const checkValue = require('./libs/checkValue');
const exitWithError = require('./libs/exitWithError');
const { MONEY, LOTTO } = require('./libs/const');

class Lottos {
  constructor(money) {
    this.validate(money);
    this.count = money / MONEY.UNIT;
    this.list = [];
    this.publish();
  }

  validate(money) {
    const { errorMsg } = checkValue.money(money);

    if (errorMsg) {
      exitWithError(errorMsg);
      return;
    }
  }

  publish() {
    for (let num = 0; num < this.count; num++) {
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

  printCount() {
    Console.print(`\n${this.count}개를 구매했습니다.`);
  }

  printList() {
    this.list.forEach((lotto) => {
      lotto.printNumbers();
    });
  }

  getRanks(winningNumbers, bonusNumber) {
    let lottoRanks = [];

    this.list.forEach((lotto) => {
      lottoRanks.push(lotto.getRank(winningNumbers, bonusNumber));
    });

    return lottoRanks.filter((rank) => rank <= 5);
  }

  printWinningDetails(lottoRanks) {
    const winningDetails = [
      '3개 일치 (5,000원)',
      '4개 일치 (50,000원)',
      '5개 일치 (1,500,000원)',
      '5개 일치, 보너스 볼 일치 (30,000,000원)',
      '6개 일치 (2,000,000,000원)',
    ];
    winningDetails.forEach((winninHistory, idx) => {
      const winningCount = this.getWinningCount(lottoRanks, idx);

      Console.print(`${winninHistory} - ${winningCount}개`);
    });
  }

  printRate(lottoRanks) {
    const lottoRate = this.calculateRate(lottoRanks);

    Console.print(`총 수익률은 ${lottoRate}%입니다.`);
  }

  calculateRate(lottoRanks) {
    const lottePrizes = [5000, 50000, 1500000, 30000000, 2000000000];
    const finalPrize = lottePrizes.reduce((acc, cur, idx) => {
      const winningCount = this.getWinningCount(lottoRanks, idx);

      return acc + cur * winningCount;
    }, 0);

    const purchaseMoney = this.count * MONEY.UNIT;

    return ((finalPrize / purchaseMoney) * 100).toFixed(1);
  }

  getWinningCount(lottoResults, idx) {
    return lottoResults.filter((result) => result === 5 - idx).length;
  }
}

module.exports = Lottos;
