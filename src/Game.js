const { Console, Random } = require('@woowacourse/mission-utils');
const validation = require('./libs/validation');
const Lotto = require('./Lotto');

class Game {
  constructor() {
    this.lottoCount = null;
    this.lottoList = [];
    this.lottoResultList = [];
  }

  setLottoCount(money) {
    this.validateMoney(money);
    this.lottoCount = money / 1000;

    this.publishLotto(this.lottoCount);
  }

  validateMoney(money) {
    if (isNaN(money)) {
      throw new Error('[ERROR] 숫자만 입력할 수 있습니다.');
    }

    if (money < 1000) {
      throw new Error('[ERROR] 최소 구입금액은 1000원입니다.');
    }

    if (money % 1000 !== 0) {
      throw new Error('[ERROR] 1000원 단위로 로또를 구입해야 합니다.');
    }
  }

  printLottoCount() {
    Console.print(`\n${this.lottoCount}개를 구매했습니다.`);
  }

  publishLotto(lottoCount) {
    for (let num = 0; num < lottoCount; num++) {
      const newLotto = new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
      this.lottoList.push(newLotto);
    }
  }

  printLottoList() {
    this.lottoList.forEach((lotto) => {
      lotto.printNumbers();
    });
  }

  printWinningHistory() {
    this.getLottoResult();
    const winningHistoryList = [
      '3개 일치 (5,000원)',
      '4개 일치 (50,000원)',
      '5개 일치 (1,500,000원)',
      '5개 일치, 보너스 볼 일치 (30,000,000원)',
      '6개 일치 (2,000,000,000원)',
    ];
    winningHistoryList.forEach((winninHistory, idx) => {
      const winningCount = this.getWinningCount(idx);

      Console.print(`${winninHistory} - ${winningCount}개`);
    });
  }

  printLottoRate() {
    const lottePrize = [5000, 50000, 1500000, 30000000, 2000000000];
    const finalPrize = lottePrize.reduce((acc, cur, idx) => {
      const winningCount = this.getWinningCount(idx);

      return acc + cur * winningCount;
    }, 0);

    const purchaseMoney = this.lottoCount * 1000;
    const lottoRate = ((finalPrize / purchaseMoney) * 100).toFixed(1);

    Console.print(`총 수익률은 ${lottoRate}%입니다.`);
  }

  getWinningCount(idx) {
    return this.lottoResultList.filter((result) => result === 5 - idx).length;
  }

  getLottoResult() {
    let lottoResultList = [];

    this.lottoList.forEach((lotto) => {
      lottoResultList.push(
        lotto.getResult(this.winningNumberList, this.bonusNumber)
      );
    });

    this.lottoResultList = lottoResultList.filter((result) => result);
  }
}

module.exports = Game;
