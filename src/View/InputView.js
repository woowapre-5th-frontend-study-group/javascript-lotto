const { Console } = require("@woowacourse/mission-utils");
const { INPUT_MESSAGE } = require("../utils/constants");

const InputView = {

    readGameMoney(callback) {
        Console.readLine(INPUT_MESSAGE.PURCHASE, callback);
    },
    readGuess(callback) {
        Console.readLine(INPUT_MESSAGE.GUESS, callback);
    },
    readBonus(callback) {
        Console.readLine(INPUT_MESSAGE.BONUS, callback);
    },
}
module.exports = InputView;