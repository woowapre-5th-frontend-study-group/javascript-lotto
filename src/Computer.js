const Lotto = require("./Lotto");
const { getIntersection } = require("./lib/utils");
const { winningRanking } = require("./lib/constants");

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
}

module.exports = Computer;
