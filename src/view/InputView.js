const MissionUtils = require("@woowacourse/mission-utils");

const InputView = {
  readPurchaseAmount(fn) {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.\n", (money) => {
      fn(money);
    });
  },

  readWinningLotto(fn) {
    MissionUtils.Console.readLine("당첨 번호를 입력해 주세요.\n", (numbers) => {
      fn(numbers);
    });
  },

  readBonusNumber(fn) {
    MissionUtils.Console.readLine(
      "보너스 번호를 입력해 주세요.\n",
      (number) => {
        fn(number);
      }
    );
  },
};

module.exports = InputView;
