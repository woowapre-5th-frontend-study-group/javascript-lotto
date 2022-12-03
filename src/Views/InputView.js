const { Console } = require("@woowacourse/mission-utils");

const InputView = {
  readUserCache(nextCallback) {
    Console.readLine("구입금액을 입력해 주세요.\n", nextCallback);
  },

  readWinningNumbers(nextCallback) {
    Console.readLine("당첨 번호를 입력해 주세요.\n", nextCallback);
  },

  readBonusNumber(nextCallback) {
    Console.readLine("보너스 번호를 입력해 주세요.\n", nextCallback);
  },
};

module.exports = InputView;
