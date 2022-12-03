const { Console } = require('@woowacourse/mission-utils');

const OutputView = {
  records: [
    '3개 일치 (5,000원)',
    '4개 일치 (50,000원)',
    '5개 일치 (1,500,000원)',
    '5개 일치, 보너스 볼 일치 (30,000,000원)',
    '6개 일치 (2,000,000,000원)',
  ],

  lottoPrizes: [5000, 50000, 1500000, 30000000, 2000000000],

  printPurchasedLottos(lottosCount, lottosNumbers) {
    this.printPurchasedLottosCount(lottosCount);
    this.printPurchasedLottosNumbers(lottosNumbers);
  },

  printPurchasedLottosCount(lottosCount) {
    Console.print(`\n${lottosCount}개를 구매했습니다.`);
  },

  printPurchasedLottosNumbers(lottosNumbers) {
    lottosNumbers.forEach((lottoNumbers) => {
      Console.print(lottoNumbers);
    });
  },

  printReuslt(lottoResult, lottosCount) {
    Console.print('\n담청 통계\n---\n');
    this.printWinningRecords(lottoResult);
    this.printRate(lottoResult, lottosCount);

    Console.close();
  },

  printWinningRecords(lottoResult) {
    this.records.forEach((record, idx) => {
      const rank = 5 - idx;
      Console.print(
        `${record} - ${this.calculateRankCount(lottoResult, rank)}개`
      );
    });
  },

  printRate(lottoResult, lottosCount) {
    let finalPrize = 0;
    this.lottoPrizes.forEach((prize, idx) => {
      const rank = 5 - idx;
      finalPrize += this.calculateRankCount(lottoResult, rank) * prize;
    });

    let rate = ((finalPrize / (lottosCount * 1000)) * 100).toFixed(1);
    rate = this.setNumberDigits(rate);

    Console.print(`총 수익률은 ${rate}%입니다.`);
  },

  calculateRankCount(lottoResult, rank) {
    return lottoResult.filter((result) => result === rank).length;
  },

  setNumberDigits(rate) {
    const integer = rate.slice(0, -2).split('').reverse();

    let newInteger = [];
    integer.forEach((num, idx) => {
      newInteger.push(num);
      if ((idx + 1) % 3 === 0 && idx !== integer.length - 1)
        newInteger.push(',');
    });

    return newInteger.reverse().join('') + rate.slice(-2);
  },
};

module.exports = OutputView;
