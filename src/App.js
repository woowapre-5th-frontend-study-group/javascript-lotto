const { Console } = require('@woowacourse/mission-utils');
const Game = require('./Game');
const WinningNumbers = require('./WinningNumbers');

class App {
  constructor() {
    this.game = new Game();
    this.winningNumbers = null;
  }

  play() {
    this.requestMoney();
  }

  requestMoney() {
    Console.readLine('구입금액을 입력해 주세요.\n', (money) => {
      this.game.setLottoCount(money);

      this.game.printLottoCount();

      this.game.printLottoList();

      this.requestWinningNumbers();
    });
  }

  requestWinningNumbers() {
    Console.readLine('\n당첨 번호를 입력해 주세요.\n', (winningNumbers) => {
      winningNumbers = winningNumbers.split(',').map((item) => Number(item));
      this.winningNumbers = new WinningNumbers(winningNumbers);

      this.requestBonusNumber();
    });
  }

  requestBonusNumber() {
    Console.readLine('\n보너스 번호를 입력해 주세요.\n', (bonusNumber) => {
      this.game.setBonusNumber(bonusNumber);

      this.printWinningStats();
    });
  }

  printWinningStats() {
    Console.print('\n당첨 통계\n---');

    this.game.printWinningHistory();

    this.game.printLottoRate();

    this.end();
  }

  end() {
    Console.close();
  }
}

const app = new App();
app.play();

module.exports = App;
