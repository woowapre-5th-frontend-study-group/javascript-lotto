/** IMPORT UTILS */
const { Console } = require('@woowacourse/mission-utils');

/** IMPORT CONSTANTS */
const { QUESTION } = require('../Constants');

const InputView = {
  readUserCache(nextCallback) {
    Console.readLine(QUESTION.USER_CACHE, nextCallback);
  },

  readWinningNumbers(nextCallback) {
    Console.readLine(QUESTION.WINNING_NUMBER, nextCallback);
  },

  readBonusNumber(nextCallback) {
    Console.readLine(QUESTION.BONUS_NUMBER, nextCallback);
  },
};

module.exports = InputView;
