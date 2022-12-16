const { Console } = require("@woowacourse/mission-utils");
const { GAME_STATISTICS, PURCHASE_RESULT_MESSAGE } = require("../utils/constants");
const { RESULT_MESSAGE } = require("../utils/constants");

const OutputView = {
    printPurchaseResult(amount, allLines) {
        Console.print('\n'+ amount + PURCHASE_RESULT_MESSAGE);
        allLines.forEach((oneLine) => {
            Console.print(`[${oneLine.join(", ")}]`) //로또 번호 출력하기
        });
    },
    printGamePrize(rank) {
        Console.print(GAME_STATISTICS);
        Console.print(RESULT_MESSAGE.RANK_FIVE + `${rank.fifth}개`);
        Console.print(RESULT_MESSAGE.RANK_FOUR + `${rank.fourth}개`);
        Console.print(RESULT_MESSAGE.RANK_THREE + `${rank.third}개`);
        Console.print(RESULT_MESSAGE.RANK_TWO + `${rank.second}개`);
        Console.print(RESULT_MESSAGE.YOU_WIN + `${rank.first}개`);
    },

    printProfitRate(profitRate) {
        Console.print(`총 수익률은 ${profitRate}%입니다.`);
    }

}
module.exports = OutputView;