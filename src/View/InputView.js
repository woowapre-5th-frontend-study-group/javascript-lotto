const { Console } = require("@woowacourse/mission-utils");

const InputView = {

    readBonus(callback) {
        Console.readLine('', callback);
    },
    readGuess(callback) {
        Console.readLine('', callback);
    },
    readGameMoney(callback) {
        Console.readLine('', callback);
    }
}
module.exports = InputView;