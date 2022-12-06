const MissionUtils = require("@woowacourse/mission-utils");

const OutputView = {
  purchaseQuantity(quantity) {
    MissionUtils.Console.print(`\n${quantity}개를 구매했습니다.`);
  },

  lottoNumber(lottoNumberArray) {
    MissionUtils.Console.print(lottoNumberArray);
  },

  stastic(arr, yield) {
    MissionUtils.Console.print(
      `당첨 통계
    ---
    3개 일치 (5,000원) - ${arr[0]}개
    4개 일치 (50,000원) - ${arr[1]}개
    5개 일치 (1,500,000원) - ${arr[2]}개
    5개 일치, 보너스 볼 일치 (30,000,000원) - ${arr[3]}개
    6개 일치 (2,000,000,000원) - ${arr[4]}개
    총 수익률은 ${yield}%입니다.`
    );
  },
};

module.exports = OutputView;
