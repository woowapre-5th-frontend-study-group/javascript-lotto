const { Console } = require("@woowacourse/mission-utils");
const { GAME_STATISTICS, PURCHASE_RESULT_MESSAGE } = require("../utils/constants");
const { getPrize } = require("../utils/constants");

const OutputView = {
    printPurchaseResult(amount, allLines) {
        Console.print('\n'+ amount + PURCHASE_RESULT_MESSAGE);
        allLines.forEach((oneLine) => {
            Console.print(`[${oneLine.join(", ")}]`) //로또 번호 출력하기
        });
    },
    printGamePrize(isBonus, rank) {
        Console.print(GAME_STATISTICS);
        Console.print(this.getResultMsg(3, isBonus, rank.fifth));
        Console.print(this.getResultMsg(4, isBonus, rank.fourth));
        Console.print(this.getResultMsg(5, isBonus, rank.third));
        Console.print(this.getResultMsg(5, isBonus, rank.second));
        Console.print(this.getResultMsg(6, isBonus, rank.first));
    },
    getResultMsg(matchCount, isBonus, correctLine) {
        const matchMsg = `${matchCount}개 일치 `;
        const bonusMsg = '보너스 볼 일치 '; 
        const prize = getPrize(matchCount);
        const prizeMsg = `(${prize}) - ${correctLine}개`;
        if(isBonus) return matchMsg + bonusMsg + prizeMsg;

        return matchMsg + prizeMsg;
    },
    printProfitRate(profitRate) {
        Console.print(`총 수익률은 ${profitRate}%입니다.`);
    }

}
module.exports = OutputView;