const MissionUtils = require("@woowacourse/mission-utils");

const OutputView = {
  printEmptyLine() {
    MissionUtils.Console.print("");
  },

  printPurchaseQuantity(quantity) {
    MissionUtils.Console.print(`${quantity}개를 구매했습니다.`);
  },
};

module.exports = OutputView;
