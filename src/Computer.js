const { Console } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { getIntersection } = require("./lib/utils");
const { winningRanking, PRINT_MESSAGE } = require("./lib/constants");

class Computer {
  winningNumbers;
  bonusNumber;
  numbersMatch = [];

  constructor(winningNumbers) {
    new Lotto(winningNumbers.split(","));
    this.winningNumbers = winningNumbers.split(",");
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
    const index = winningRanking.findIndex(
      (win) =>
        win.winningNumberMatch === winningNumberMatch &&
        win.isBonusNumberMatch === isBonusNumberMatch
    );
    winningRanking[index].count++;
  }

  printWinningStatistics() {
    Console.print("당첨통계");
    Console.print("---");
    winningRanking.forEach((winningHistory) => {
      Console.print(`${PRINT_MESSAGE.WINNING_HISTORY(winningHistory)}`);
    });
  }
}

module.exports = Computer;
