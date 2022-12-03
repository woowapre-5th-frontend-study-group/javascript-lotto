const { INPUT_MESSAGE } = require("../utils/constants");
const InputView = require("../View/InputView");
const OutputView = require("../View/OutputView");
const InputValidation = require("./InputVadlidation");
const GameAnswer = require("../Model/GameAnswer");
const Lotto = require("../Model/Lotto");

const GameController = {

    askBonus(guess) {
        InputView.readBonus((bonus) => {
            InputValidation.isValidBonus(bonus, guess);
            console.log(bonus);
        });
    },

    askGuess() {
        InputView.readGuess((guessNums) => {
            const guess = guessNums.split(',');
            InputValidation.isValidGuess(guess);
            new Lotto(guess)
            console.log(Lotto.getGuess());
            this.askBonus(guess);
        });
    },


    askGameMoney() {
        InputView.readGameMoney((money) => {
            InputValidation.isValidPurchase(money);
            //console.log(money);
            new GameAnswer(money).generate();
            OutputView.printPurchaseResult();
            this.askGuess();
        });
    },

    startGame() {
        OutputView.printMoneyRequest();
        this.askGameMoney();
    }

}

module.exports = GameController;