const { Console } = require("@woowacourse/mission-utils");
const UserLotto = require("./UserLotto");
const Computer = require("./Computer");
const { ENTER_MESSAGE } = require("./utils/constants");
const OutputView = require("./view/OutputView");

class App {
  userLotto;
  computer;
  profitRate;

  play() {
    Console.readLine(ENTER_MESSAGE.PURCHASE_AMOUT, (purchaseAmout) => {
      this.userLotto = new UserLotto(purchaseAmout);

      OutputView.printLottoCount(this.userLotto.count);
      OutputView.printLottoNumbers(this.userLotto.totalNumbers);

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
      this.computer.setBonusNumber(bonusNumber);
      this.computer.getMatchs(this.userLotto.totalNumbers);

      OutputView.printWinningStatistics(this.computer.winningRanking);
      OutputView.printProfitRate(
        this.userLotto.purchaseAmout,
        this.computer.getTotalRevenue()
      );

      Console.close();
    });
  }
}

const app = new App();
app.play();

module.exports = App;
