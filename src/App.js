const { Console } = require("@woowacourse/mission-utils");
const UserLotto = require("./UserLotto");
const Computer = require("./Computer");
const { ENTER_MESSAGE } = require("./lib/constants");
const ProfitRate = require("./ProfiRate");

class App {
  userLotto;
  computer;
  profitRate;

  play() {
    Console.readLine(ENTER_MESSAGE.PURCHASE_AMOUT, (purchaseAmout) => {
      this.userLotto = new UserLotto(purchaseAmout);
      this.userLotto.printLottoCount();
      this.userLotto.printLottoNumbers();
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
      this.computer.getMatchs(this.userLotto.totalNumbers);
      this.computer.printWinningStatistics();

      this.profitRate = new ProfitRate(
        this.userLotto.purchaseAmout,
        this.computer.getTotalRevenue()
      );
      this.profitRate.printProfitRate();
      Console.close();
    });
  }
}

const app = new App();
app.play();

module.exports = App;
