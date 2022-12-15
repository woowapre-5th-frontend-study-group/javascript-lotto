const MissionUtils = require("@woowacourse/mission-utils");

const InputView = {
  readPurchaseAmount(fn) {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.\n", (money) => {
      fn(money);
    });
  },
};

module.exports = InputView;
