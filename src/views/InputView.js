const { Console } = require('@woowacourse/mission-utils');

const InputView = {
  readMoney(callback) {
    Console.readLine('구입금액을 입력해주세요.\n', callback);
  },

  readWinningNumbers(callback) {
    Console.readLine('\n당첨 번호를 입력해 주세요.\n', callback);
  },

  readBonusNumber(callback) {
    Console.readLine('\n보너스 번호를 입력해 주세요.\n', callback);
  },
};

module.exports = InputView;
