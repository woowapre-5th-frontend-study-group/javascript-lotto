const { Console, Random } = require('@woowacourse/mission-utils');
const validation = require('./libs/validation');
const Lotto = require('./Lotto');

class Game {
  constructor() {
    this.lottoCount = null;
    this.lottoList = [];
    this.lottoResultList = [];
    this.winningNumberList = null;
    this.bonusNumber = null;
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

  setWinningNumbers(numbers) {
    numbers = numbers.split(',').map((item) => Number(item));
    this.validateWinningNumbers(numbers);

    this.winningNumberList = numbers;
  }

  validateWinningNumbers(numbers) {
    validation.checkNumberList(numbers);
  }

  setBonusNumber(number) {
    number = Number(number);
    this.validateBonusNumber(number);

    this.bonusNumber = number;
  }

  validateBonusNumber(number) {
    validation.checkBonusNumber(number, this.winningNumberList);
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
      const winningCount = this.lottoResultList.filter(
        (result) => result === 5 - idx
      ).length;

      Console.print(`${winninHistory} - ${winningCount}개`);
    });
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
