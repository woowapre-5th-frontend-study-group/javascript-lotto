const { Console } = require('@woowacourse/mission-utils');
const BonusNumber = require('./BonusNumber');
const validation = require('./libs/validation');
const Lottos = require('./Lottos');
const WinningNumbers = require('./WinningNumbers');

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
      validation.checkMoney(money);
      this.lottos = new Lottos(money);

      this.lottos.printCount();
      this.lottos.printList();

      this.requestWinningNumbers();
    });
  }

  requestWinningNumbers() {
    Console.readLine('\n당첨 번호를 입력해 주세요.\n', (winningNumbers) => {
      winningNumbers = winningNumbers.split(',').map((item) => Number(item));

      validation.checkNumberList(winningNumbers);
      this.winningNumbers = new WinningNumbers(winningNumbers);

      this.requestBonusNumber();
    });
  }

  requestBonusNumber() {
    Console.readLine('\n보너스 번호를 입력해 주세요.\n', (bonusNumber) => {
      bonusNumber = Number(bonusNumber);

      validation.checkBonusNumber(bonusNumber, this.winningNumbers.value);
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
