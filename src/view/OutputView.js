const MissionUtils = require("@woowacourse/mission-utils");

const OutputView = {
  printEmptyLine() {
    MissionUtils.Console.print("");
  },

  printPurchaseQuantity(quantity) {
    MissionUtils.Console.print(`${quantity}개를 구매했습니다.`);
  },

  printIssuedLottos(lottos) {
    lottos.forEach((lotto) => {
      // MissionUtils.Console.print(lotto); //[1,2,3,4,5,6]
      MissionUtils.Console.print(`[${lotto.join(", ")}]`); //[1,2,3,4,5,6]
    });
  },

  printStastic(winnerData, returnRate) {
    MissionUtils.Console.print("당첨 통계");
    MissionUtils.Console.print("---");
    MissionUtils.Console.print(
      `3개 일치 (5,000원) - ${winnerData.fifthPlace}개`
    );
    MissionUtils.Console.print(
      `4개 일치 (50,000원) - ${winnerData.fourthPlace}개`
    );
    MissionUtils.Console.print(
      `5개 일치 (1,500,000원) - ${winnerData.thirdPlace}개`
    );
    MissionUtils.Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winnerData.secondPlace}개`
    );
    MissionUtils.Console.print(
      `6개 일치 (2,000,000,000원) - ${winnerData.firstPlace}개`
    );
    MissionUtils.Console.print(`총 수익률은 ${returnRate}%입니다.`);
  },
};

module.exports = OutputView;
