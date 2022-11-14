const { Console } = require("@woowacourse/mission-utils");
const { winningRanking } = require("./constants");
const Lotto = require("./Lotto");
const NumbersMatch = require("./NumbersMatch");
const ProfitRate = require("./ProfitRate");
const UserLotto = require("./UserLotto");

class App {
  purchaseAmout;
  userLotto;
  winningNumbers;
  bonnusNumber;
  userLottoNumbesMatch;
  profitRate;

  play() {
    Console.readLine("구입금액을 입력해 주세요.\n", async (purchaseAmout) => {
      this.purchaseAmout = purchaseAmout;
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
    Console.readLine("당첨 번호를 입력해 주세요.\n", (winningNumbers) => {
      new Lotto(winningNumbers.split(","));
      this.winningNumbers = winningNumbers.split(",");
      this.getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.readLine("보너스 번호를 입력해 주세요.\n", (bonusNumber) => {
      this.bonnusNumber = bonusNumber;
      this.getUserNumbersMatch();
      this.printWinningStatistics();
      this.getProfitRate();
      this.printProfitRate();
      Console.close();
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

  printWinningStatistics() {
    Console.print("당첨통계");
    Console.print("---");
    winningRanking.forEach((element) => {
      if (element.isBonusNumberMatch) {
        Console.print(
          `${element.winningNumberMatch}개 일치, 보너스 볼 일치 (${element.prizeMoney}원) - ${element.count}개`
        );
      } else {
        Console.print(
          `${element.winningNumberMatch}개 일치 (${element.prizeMoney}원) - ${element.count}개`
        );
      }
    });
  }

  getProfitRate() {
    const totalRevenue = winningRanking.reduce((acc, cur) => {
      return acc + cur.prizeMoney * cur.count;
    }, 0);
    const profitRate = new ProfitRate(this.purchaseAmout, totalRevenue);
    this.profitRate = profitRate.number;
  }

  printProfitRate() {
    Console.print(`총 수익률은 ${100 + this.profitRate}%입니다`);
  }
}

const app = new App();
app.play();

module.exports = App;
