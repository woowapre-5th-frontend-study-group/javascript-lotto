const { Console } = require("@woowacourse/mission-utils");
const UserLotto = require("./UserLotto");
const Computer = require("./Computer");
const {
  winningRanking,
  ENTER_MESSAGE,
  PRINT_MESSAGE,
} = require("./lib/constants");
const { getProfitRate } = require("./lib/utils");

class App {
  userLotto;
  computer;
  profitRate;

  play() {
    Console.readLine(ENTER_MESSAGE.PURCHASE_AMOUT, (purchaseAmout) => {
      this.userLotto = new UserLotto(purchaseAmout);
      this.userLotto.printLottoCountNumbersMessage();
      this.getWinningNumbers();
    });
  }

  getWinningNumbers() {
    Console.readLine(ENTER_MESSAGE.WINNING_NUMBERS, (winningNumbers) => {
      this.computer = new Computer(winningNumbers);
      this.getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.readLine(ENTER_MESSAGE.BONUS_NUMBER, (bonusNumber) => {
      this.computer.bonnusNumber = bonusNumber;

      // 분리 가능
      this.computer.getMatchs(this.userLotto.totalNumbers);
      this.computer.getCount();
      this.computer.printWinningStatistics();
      this.getTotalRevenue();
      this.printProfitRate();
      Console.close();
    });
  }

  getTotalRevenue() {
    const totalRevenue = winningRanking.reduce((acc, cur) => {
      return acc + cur.prizeMoney * cur.count;
    }, 0);
    this.profitRate = getProfitRate(this.userLotto.purchaseAmout, totalRevenue);
  }

  printProfitRate() {
    Console.print(PRINT_MESSAGE.PROFIT_RATE(this.profitRate));
  }
}

const app = new App();
app.play();

module.exports = App;
