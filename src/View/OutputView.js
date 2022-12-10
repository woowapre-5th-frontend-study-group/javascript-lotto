const { Console } = require('@woowacourse/mission-utils');
const { PRIZE, MONEY, WINNING_DETAIL, MESSAGE } = require('../libs/const');

const OutputView = {
  winningPhrases: [
    WINNING_DETAIL.FIFTH,
    WINNING_DETAIL.FOURTH,
    WINNING_DETAIL.THIRD,
    WINNING_DETAIL.SECOND,
    WINNING_DETAIL.FIRST,
  ],

  lottoPrizes: [
    PRIZE.FIFTH,
    PRIZE.FOURTH,
    PRIZE.THIRD,
    PRIZE.SECOND,
    PRIZE.FIRST,
  ],

  printMessage(message) {
    Console.print(message);
  },

  printLottosCount(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printLottosResult(lottosRank, lottoCount) {
    Console.print(MESSAGE.WINNING_STATS);
    this.printWinningDetails(lottosRank);
    this.printLottoRate(lottosRank, lottoCount);
  },

  printWinningDetails(lottosRank) {
    const winningDetails = this.getWinningDetails(lottosRank);

    winningDetails.forEach((winningDetail) => {
      Console.print(winningDetail);
    });
  },

  printLottoRate(lottosRank, lottoCount) {
    const lottoRate = this.getRate(lottosRank, lottoCount);
    OutputView.printMessage(`총 수익률은 ${lottoRate}%입니다.`);
  },

  getWinningDetails(lottoRanks) {
    const winningDetails = [];
    this.winningPhrases.forEach((winningDetail, idx) => {
      const winningCount = this.calculateWinningCount(lottoRanks, idx);

      winningDetails.push(`${winningDetail} - ${winningCount}개`);
    });

    return winningDetails;
  },

  getRate(lottosRank, lottoCount) {
    const finalPrize = this.calculateFinalPrize(lottosRank);

    const purchaseMoney = lottoCount * MONEY.UNIT;

    return this.setNumberDigits(
      String(((finalPrize / purchaseMoney) * 100).toFixed(1))
    );
  },

  calculateFinalPrize(lottosRank) {
    return this.lottoPrizes.reduce((acc, cur, idx) => {
      const winningCount = this.calculateWinningCount(lottosRank, idx);

      return acc + cur * winningCount;
    }, 0);
  },

  setNumberDigits(rate) {
    const integer = rate.slice(0, -2).split('').reverse();
    const decimal = rate.slice(-2);

    let newInteger = [];
    integer.forEach((num, idx) => {
      newInteger.push(num);
      if (this.isPutComma(integer, idx)) newInteger.push(',');
    });

    return newInteger.reverse().join('') + decimal;
  },

  isPutComma(integer, idx) {
    return idx !== integer.length - 1 && (idx + 1) % 3 === 0;
  },

  calculateWinningCount(lottoRanks, idx) {
    return lottoRanks.filter((rank) => rank === 5 - idx).length;
  },
};

module.exports = OutputView;
