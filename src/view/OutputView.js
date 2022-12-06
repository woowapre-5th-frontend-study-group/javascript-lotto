const MissionUtils = require("@woowacourse/mission-utils");

const OutputView = {
  purchaseQuantity(quantity) {
    MissionUtils.Console.print(`\n${quantity}개를 구매했습니다.`);
  },

  lottoNumber(lottoNumberArray) {
    MissionUtils.Console.print(lottoNumberArray);
  },
};

module.exports = OutputView;
