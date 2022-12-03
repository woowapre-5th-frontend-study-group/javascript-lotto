const { Console } = require("@woowacourse/mission-utils");
const { INPUT_MESSAGE, PURCHASE_RESULT_MESSAGE } = require("../utils/constants");

const OutputView = {

    printBonusRequest() {
        Console.print(INPUT_MESSAGE.BONUS);
    },
    printGuessRequest() {
        Console.print(INPUT_MESSAGE.GUESS);
    },
    printPurchaseResult(amount, allLines) {
        Console.print(amount + PURCHASE_RESULT_MESSAGE);
        allLines.forEach((oneLine) => {
            Console.print(`[${oneLine.join(", ")}]`) //로또 번호 출력하기
        });
    },
    printMoneyRequest() {
        Console.print(INPUT_MESSAGE.PURCHASE);
    },


}
module.exports = OutputView;