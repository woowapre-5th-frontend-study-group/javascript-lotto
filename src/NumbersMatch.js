const { getIntersection } = require("./lib/utils");

class NumbersMatch {
  userLottoNumbesMatch = [];
  constructor(winningNumbers, bonusNumber, totalUserLottoNumbers) {
    this.getMatchs(winningNumbers, bonusNumber, totalUserLottoNumbers);
  }

  getMatchs(winningNumbers, bonusNumber, totalUserLottoNumbers) {
    totalUserLottoNumbers.forEach((userLottoNumbers) => {
      const match = { winningNumberMatch: 0, isBonusNumberMatch: false };
      match.winningNumberMatch = getIntersection(
        winningNumbers,
        userLottoNumbers
      ).length;
      if (match.winningNumberMatch < 3) {
        return;
      }
      if (userLottoNumbers.includes(bonusNumber)) {
        match.isBonusNumberMatch = true;
      }
      this.userLottoNumbesMatch.push(match);
    });
  }
}

module.exports = NumbersMatch;
