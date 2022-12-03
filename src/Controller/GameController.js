const { INPUT_MESSAGE } = require("../utils/constants");
const InputView = require("../View/InputView");
const OutputView = require("../View/OutputView");
const InputValidation = require("./InputVadlidation");

const GameController = {

    askBonus() {
        InputView.readBonus((bonus) => {
            InputValidation.isValidBonus(bonus);
        });
    },

    askGuess() {
        InputView.readGuess((guess) => {
            InputValidation.isValidGuess(guess);
        });
    },


    askGameMoney() {
        InputView.readGameMoney((money) => {
            InputValidation.isValidPurchase(money);
            console.log(money);
        });
    },

    startGame() {
        OutputView.printMoneyRequest();
        this.askGameMoney();
    }

}

module.exports = GameController;