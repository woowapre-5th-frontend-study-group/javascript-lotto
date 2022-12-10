const { Console } = require('@woowacourse/mission-utils');
const { MESSAGE } = require('../libs/const');

const InputView = {
  readMoney(callback) {
    Console.readLine(MESSAGE.REQUEST_MONEY, callback);
  },

  readWinningNumbers(callback) {
    Console.readLine(MESSAGE.REQUEST_WINNING_NUMBERS, callback);
  },

  readBonusNumber(callback) {
    Console.readLine(MESSAGE.REQUEST_BONUS_NUMBER, callback);
  },
};

module.exports = InputView;
