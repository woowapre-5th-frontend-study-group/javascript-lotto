const { Console } = require('@woowacourse/mission-utils');
const { MONEY } = require('../libs/const');

const OutputView = {
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

  printWinningDetails(winningDetails) {
    winningDetails.forEach((winningDetail) => {
      Console.print(winningDetail);
    });
  },

  printLottoRate(lottoRate) {
    OutputView.printMessage(`총 수익률은 ${lottoRate}%입니다.`);
  },
};

module.exports = OutputView;
