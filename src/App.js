const Lottos = require('./Lottos');
const WinningNumbers = require('./WinningNumbers');
const BonusNumber = require('./BonusNumber');
const { Console } = require('@woowacourse/mission-utils');
const checkValue = require('./libs/checkValue');
const exitWithError = require('./libs/exitWithError');

class App {
  constructor() {
    this.lottos = null;
    this.winningNumbers = null;
    this.bonusNumber = null;
  }

  play() {
    this.requestMoney();
  }

  requestMoney() {
    Console.readLine('구입금액을 입력해 주세요.\n', (money) => {
      const { errorMsg } = checkValue.money(money);
      if (errorMsg) exitWithError(errorMsg);

      this.lottos = new Lottos(money);

      this.lottos.printCount();
      this.lottos.printList();

      this.requestWinningNumbers();
    });
  }

  requestWinningNumbers() {
    Console.readLine('\n당첨 번호를 입력해 주세요.\n', (winningNumbers) => {
      winningNumbers = winningNumbers.split(',').map((item) => Number(item));

      const { errorMsg } = checkValue.numberList(winningNumbers, '당첨 번호');
      if (errorMsg) exitWithError(errorMsg);

      this.winningNumbers = new WinningNumbers(winningNumbers);

      this.requestBonusNumber();
    });
  }

  requestBonusNumber() {
    Console.readLine('\n보너스 번호를 입력해 주세요.\n', (bonusNumber) => {
      bonusNumber = Number(bonusNumber);

      const { errorMsg } = checkValue.bonusNumber(
        bonusNumber,
        this.winningNumbers.value
      );
      if (errorMsg) exitWithError(errorMsg);
      this.bonusNumber = new BonusNumber(bonusNumber);

      this.printWinningStats();
    });
  }

  printWinningStats() {
    Console.print('\n당첨 통계\n---');

    const lottoReultArray = this.lottos.getResult(
      this.winningNumbers.value,
      this.bonusNumber.value
    );

    this.lottos.printWinningHistory(lottoReultArray);
    this.lottos.printRate(lottoReultArray);

    this.end();
  }

  end() {
    Console.close();
  }
}

const app = new App();
app.play();

module.exports = App;
