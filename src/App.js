const { Console } = require("@woowacourse/mission-utils");
const { winningRanking } = require("./constants");
const Lotto = require("./Lotto");
const NumbersMatch = require("./NumbersMatch");
const UserLotto = require("./UserLotto");

class App {
  userLotto;
  winningNumbers;
  bonnusNumber;
  userLottoNumbesMatch;

  play() {
    Console.print("구입금액을 입력해 주세요.");
    Console.readLine("", async (purchaseAmout) => {
      const userLotto = new UserLotto(purchaseAmout);
      this.userLotto = userLotto;
      this.printLottoCountNumbersMessage();
      this.getWinningNumbers();
    });
  }

  printLottoCountNumbersMessage() {
    Console.print(`${this.userLotto.count}개를 구매했습니다.`);
    this.userLotto.numbers.forEach((number) => {
      Console.print(number);
    });
  }

  getWinningNumbers() {
    Console.print("당첨 번호를 입력해 주세요.");
    Console.readLine("", (winningNumbers) => {
      new Lotto(winningNumbers.split(","));
      this.winningNumbers = winningNumbers.split(",");
      this.getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.readLine("보너스 번호를 입력해 주세요.\n", (bonusNumber) => {
      this.bonnusNumber = bonusNumber;
      this.getUserNumbersMatch();
    });
  }

  getUserNumbersMatch() {
    const numbersMatch = new NumbersMatch(
      this.winningNumbers,
      this.bonnusNumber,
      this.userLotto.numbers
    );
    this.userLottoNumbesMatch = numbersMatch.userLottoNumbesMatch;
    this.userLottoNumbesMatch.forEach((match) => {
      const index = winningRanking.findIndex(
        (win) =>
          win.winningNumberMatch === match.winningNumberMatch &&
          win.isBonusNumberMatch === match.isBonusNumberMatch
      );
      winningRanking[index].count++;
    });
  }

  printWinningStatistics() {}
}

const app = new App();
app.play();

module.exports = App;
