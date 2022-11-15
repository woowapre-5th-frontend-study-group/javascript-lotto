const { Console } = require("@woowacourse/mission-utils");
const { PRINT_MESSAGE } = require("./lib/constants");

class View {
  static lottoCount(lottoCount) {
    Console.print(PRINT_MESSAGE.PURCHASE_COUNT(lottoCount));
  }

  static lottoNumbers(totalNumbers) {
    totalNumbers.forEach((numbers) => {
      Console.print(PRINT_MESSAGE.LOTTO_NUMBERS(numbers));
    });
  }

  static winningStatistics(winningRanking) {
    Console.print("당첨통계");
    Console.print("---");
    winningRanking.forEach((winningHistory) => {
      Console.print(`${PRINT_MESSAGE.WINNING_HISTORY(winningHistory)}`);
    });
  }

  static profitRate(profitRate) {
    Console.print(PRINT_MESSAGE.PROFIT_RATE(profitRate));
  }
}

module.exports = View;
