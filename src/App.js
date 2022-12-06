const { Console } = require("@woowacourse/mission-utils");
const UserLotto = require("./UserLotto");
const Computer = require("./Computer");
const { ENTER_MESSAGE } = require("./utils/constants");
const OutputView = require("./view/OutputView");

class App {
  play() {
    Console.readLine(ENTER_MESSAGE.PURCHASE_AMOUT, (purchaseAmout) => {
      this.userLotto = new UserLotto(purchaseAmout);

      OutputView.printLottoCount(this.userLotto.getCount());
      OutputView.printLottoNumbers(this.userLotto.getTotalNumbers());

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
      this.computer.getMatchs(this.userLotto.getTotalNumbers());

      OutputView.printWinningStatistics(this.computer.getWinningRanking());
      OutputView.printProfitRate(
        this.userLotto.getPurchaseAmout(),
        this.computer.getTotalRevenue()
      );

      Console.close();
    });
  }
}

const app = new App();
app.play();

module.exports = App;
