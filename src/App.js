const { Console } = require("@woowacourse/mission-utils");
const { winningRanking, ENTER_MESSAGE, PRINT_MESSAGE } = require("./constants");
const Lotto = require("./Lotto");
const NumbersMatch = require("./NumbersMatch");
const ProfitRate = require("./ProfitRate");
const UserLotto = require("./UserLotto");
const { addMoneyComma } = require("./utils");

class App {
  purchaseAmout;
  userLotto;
  winningNumbers;
  bonnusNumber;
  userLottoNumbesMatch;
  profitRate;

  play() {
    Console.readLine(ENTER_MESSAGE.PURCHASE_AMOUT, (purchaseAmout) => {
      this.purchaseAmout = purchaseAmout;
      const userLotto = new UserLotto(purchaseAmout);
      this.userLotto = userLotto;
      this.printLottoCountNumbersMessage();
      this.getWinningNumbers();
    });
  }

  printLottoCountNumbersMessage() {
    Console.print(PRINT_MESSAGE.PURCHASE_COUNT(this.userLotto.count));
    this.userLotto.numbers.forEach((number) => {
      Console.print(PRINT_MESSAGE.LOTTO_NUMBERS(number));
    });
  }

  getWinningNumbers() {
    Console.readLine(ENTER_MESSAGE.WINNING_NUMBERS, (winningNumbers) => {
      new Lotto(winningNumbers.split(","));
      this.winningNumbers = winningNumbers.split(",");
      this.getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.readLine(ENTER_MESSAGE.BONUS_NUMBER, (bonusNumber) => {
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
          `${
            element.winningNumberMatch
          }개 일치, 보너스 볼 일치 (${addMoneyComma(element.prizeMoney)}원) - ${
            element.count
          }개`
        );
      } else {
        Console.print(
          `${element.winningNumberMatch}개 일치 (${addMoneyComma(
            element.prizeMoney
          )}원) - ${element.count}개`
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
    Console.print(PRINT_MESSAGE.PROFIT_RATE(this.profitRate));
  }
}

const app = new App();
app.play();

module.exports = App;
