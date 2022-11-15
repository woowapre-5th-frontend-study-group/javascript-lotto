const { Console } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { getIntersection } = require("./lib/utils");
const { winningRanking, PRINT_MESSAGE } = require("./lib/constants");

class Computer {
  winningNumbers;
  bonusNumber;
  winningRanking;

  constructor(winningNumbers) {
    new Lotto(winningNumbers.split(","));
    this.winningNumbers = winningNumbers.split(",");
    this.winningRanking = winningRanking;
  }

  getMatchs(totalUserLottoNumbers) {
    totalUserLottoNumbers.forEach((userLottoNumbers) => {
      const isBonusNumberMatch = userLottoNumbers.includes(this.bonusNumber);
      const winningNumberMatch = getIntersection(
        this.winningNumbers,
        userLottoNumbers
      ).length;
      if (winningNumberMatch < 3) {
        return;
      }
      this.getCount({ winningNumberMatch, isBonusNumberMatch });
    });
  }

  getCount({ winningNumberMatch, isBonusNumberMatch }) {
    const index = this.winningRanking.findIndex(
      (win) =>
        win.winningNumberMatch === winningNumberMatch &&
        win.isBonusNumberMatch === isBonusNumberMatch
    );
    this.winningRanking[index].count++;
  }

  getTotalRevenue() {
    return this.winningRanking.reduce((acc, cur) => {
      return acc + cur.prizeMoney * cur.count;
    }, 0);
  }

  printWinningStatistics() {
    Console.print("당첨통계");
    Console.print("---");
    this.winningRanking.forEach((winningHistory) => {
      Console.print(`${PRINT_MESSAGE.WINNING_HISTORY(winningHistory)}`);
    });
  }
}

module.exports = Computer;
