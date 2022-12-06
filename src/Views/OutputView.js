/** IMPORT UTILS */
const { Console } = require('@woowacourse/mission-utils');

/** IMPORT CONSTANTS */
const CONSTANTS = require('../Constants');

const OutputView = {
  printUserLottoInfo(userLottoCount, userLottos) {
    Console.print(`${userLottoCount}${CONSTANTS.OUTPUT.MESSAGE.LOTTO_COUNT}`);

    userLottos.forEach((userLotto) => {
      const userLottoString = userLotto.toString();
      Console.print(userLottoString);
    });

    OutputView.addNewLine();
  },

  printMatchResult(matchResult) {
    const printMessage = CONSTANTS.replaceParam(
      CONSTANTS.OUTPUT.MESSAGE.RESULT,
      matchResult['3'] || 0,
      matchResult['4'] || 0,
      matchResult['5'] || 0,
      matchResult['5_bonus'] || 0,
      matchResult['6'] || 0,
      matchResult['RateOfReturn']
    );

    Console.print(printMessage);
  },

  printError(errorMesassge) {
    Console.print(`${CONSTANTS.ERROR.HEADING} ${errorMesassge}`);
    OutputView.addNewLine();
  },

  addNewLine() {
    Console.print(CONSTANTS.OUTPUT.NULL);
  },
};

module.exports = OutputView;
