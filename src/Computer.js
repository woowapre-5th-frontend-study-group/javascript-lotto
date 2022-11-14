const { Console } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { getIntersection, addMoneyComma } = require("./lib/utils");
const { winningRanking } = require("./lib/constants");

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
      const match = { winningNumberMatch: 0, isBonusNumberMatch: false };
      match.winningNumberMatch = getIntersection(
        this.winningNumbers,
        userLottoNumbers
      ).length;
      if (match.winningNumberMatch < 3) {
        return;
      }
      if (userLottoNumbers.includes(this.bonusNumber)) {
        match.isBonusNumberMatch = true;
      }
      this.numbersMatch.push(match);
    });
  }

  getCount() {
    this.numbersMatch.forEach((match) => {
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
}

module.exports = Computer;
