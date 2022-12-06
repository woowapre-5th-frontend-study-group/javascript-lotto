const { Console } = require("@woowacourse/mission-utils");
const { PRINT_MESSAGE } = require("../utils/constants");
const { getProfitRate, roundingNumber } = require("../utils/utils");

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printLottoCount(lottoCount) {
    Console.print(PRINT_MESSAGE.PURCHASE_COUNT(lottoCount));
  },

  printLottoNumbers(totalNumbers) {
    totalNumbers.forEach((numbers) => {
      Console.print(PRINT_MESSAGE.LOTTO_NUMBERS(numbers));
    });
  },

  printWinningStatistics(winningRanking) {
    Console.print("당첨통계");
    Console.print("---");
    winningRanking.forEach((winningHistory) => {
      Console.print(`${PRINT_MESSAGE.WINNING_HISTORY(winningHistory)}`);
    });
  },

  printProfitRate(purchaseAmout, totalRevenue) {
    const profitRate = getProfitRate(purchaseAmout, totalRevenue);
    Console.print(PRINT_MESSAGE.PROFIT_RATE(roundingNumber(profitRate)));
  },
};

module.exports = OutputView;
