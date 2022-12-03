const { Console } = require("@woowacourse/mission-utils");

const { INPUT_MESSAGE } = require("../utils/constants");

const OutputView = {
    printMoneyRequest() {
        Console.print(INPUT_MESSAGE.PURCHASE);
    },


}
module.exports = OutputView;