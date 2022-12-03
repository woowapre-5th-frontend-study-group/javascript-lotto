const { Console } = require("@woowacourse/mission-utils");

const OutputView = {
  printUserLottoInfo(userLottoCount, userLottos) {
    Console.print(`${userLottoCount}개를 구매했습니다.`);

    userLottos.forEach((userLotto) => {
      const userLottoString = userLotto.toString();
      Console.print(userLottoString);
    });

    OutputView.addNewLine();
  },

  printMatchResult(matchResult) {
    const printMessage = [
      "당첨 통계",
      "---",
      `3개 일치 (5,000원) - ${matchResult["3"] || 0}개`,
      `4개 일치 (50,000원) - ${matchResult["4"] || 0}개`,
      `5개 일치 (1,500,000원) - ${matchResult["5"] || 0}개`,
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${
        matchResult["5_bonus"] || 0
      }개`,
      `6개 일치 (2,000,000,000원) - ${matchResult["6"] || 0}개`,
      `총 수익률은 ${matchResult["RateOfReturn"]}%입니다.`,
    ];

    printMessage.forEach((message) => {
      Console.print(message);
    });
  },

  addNewLine() {
    Console.print("");
  },
};

module.exports = OutputView;
