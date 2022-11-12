const { Console, Random } = require('@woowacourse/mission-utils');
const Lotto = require('./Lotto');
const checkValue = require('./libs/checkValue');
const exitWithError = require('./libs/exitWithError');

class Lottos {
  constructor(money) {
    this.validate(money);
    this.count = money / 1000;
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
    const newNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);

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

  getResult(winningNumbers, bonusNumber) {
    let lottoResults = [];

    this.list.forEach((lotto) => {
      lottoResults.push(lotto.getRank(winningNumbers, bonusNumber));
    });

    return lottoResults.filter((result) => result);
  }

  printWinningDetails(lottoResults) {
    const winningDetails = [
      '3개 일치 (5,000원)',
      '4개 일치 (50,000원)',
      '5개 일치 (1,500,000원)',
      '5개 일치, 보너스 볼 일치 (30,000,000원)',
      '6개 일치 (2,000,000,000원)',
    ];
    winningDetails.forEach((winninHistory, idx) => {
      const winningCount = this.getWinningCount(lottoResults, idx);

      Console.print(`${winninHistory} - ${winningCount}개`);
    });
  }

  printRate(lottoResults) {
    const lottePrizes = [5000, 50000, 1500000, 30000000, 2000000000];
    const finalPrize = lottePrizes.reduce((acc, cur, idx) => {
      const winningCount = this.getWinningCount(lottoResults, idx);

      return acc + cur * winningCount;
    }, 0);

    const purchaseMoney = this.count * 1000;
    const lottoRate = ((finalPrize / purchaseMoney) * 100).toFixed(1);

    Console.print(`총 수익률은 ${lottoRate}%입니다.`);
  }

  getWinningCount(lottoResults, idx) {
    return lottoResults.filter((result) => result === 5 - idx).length;
  }
}

module.exports = Lottos;
