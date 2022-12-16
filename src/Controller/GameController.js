const { PRIZE, getPrize } = require("../utils/constants");
const InputView = require("../View/InputView");
const OutputView = require("../View/OutputView");

const InputValidation = require("../utils/InputVadlidation");

const GameAnswer = require("../Model/GameAnswer");
const Lotto = require("../Model/Lotto");

class GameController {
    
    constructor() {
        this.inputMoney = 0;
        this.gameAnswer;
        this.lotto;
        this.isBonus;
        this.rank = {first: 0, second: 0, third: 0, fourth: 0, fifth: 0};
    }

    startGame() {
        this.askGameMoney();
    }
    askGameMoney() {
        InputView.readGameMoney((money) => {
            this.inputMoney = money;
            InputValidation.isValidPurchase(money);
            //console.log(money);
            this.gameAnswer = new GameAnswer(money);
            const amount = this.gameAnswer.getAmount();
            const allLines = this.gameAnswer.generate();
            OutputView.printPurchaseResult(amount, allLines);
            this.askGuess();
        });
    }

    askGuess() {
        InputView.readGuess((guessNums) => {
            let guess = guessNums.split(',');
            InputValidation.isValidGuess(guess);
            guess = guess.map((number) => parseInt(number));
            this.lotto = new Lotto(guess)
            //console.log(this.lotto.getGuess());
            this.askBonus(guess);
        });
    }

    askBonus(guess) {
        InputView.readBonus((bonus) => {
            InputValidation.isValidBonus(bonus, guess);
            //console.log(bonus);
            this.lotto.setBonus(parseInt(bonus));
            this.showGameResult(guess, parseInt(bonus));
        });
    }

    showGameResult(guess) {
        this.compareWithAnswer(guess);
        OutputView.printGamePrize(this.isBonus, this.rank);
        OutputView.printProfitRate(this.getProfit());
    }

    compareWithAnswer(guessNums) {
        const allLines = this.gameAnswer.getAnswer();
        //console.log(allLines);
        allLines.forEach((oneLine) => {
          const matchNums = oneLine.filter((answer) => guessNums.includes(answer));
          const matchCount = matchNums.length;
          this.isBonus = oneLine.includes(this.lotto.getBonus());
          //console.log(this.lotto.getBonus());
          //console.log(matchCount, this.isBonus)
          if (matchCount > 2) this.getRank(matchCount);
        });
    }

    getRank(matchCount) {
        if(matchCount == 3) this.rank.fifth++; 
        if(matchCount == 4) this.rank.fourth++; 
        if(matchCount == 5 && !(this.isBonus)) this.rank.third++; 
        if(matchCount == 5 && this.isBonus) this.rank.second++; 
        if(matchCount == 6) this.rank.first++; 
    }
    
    getProfit() {
        const {rank} = this;
        const profit = rank.first * PRIZE.FIRST + rank.second * PRIZE.SECOND + rank.third * PRIZE.THIRD + rank.fourth * PRIZE.FOURTH + rank.fifth * PRIZE.FIFTH;
        return this.getProfitRate(profit);
    }

    getProfitRate(profit) {
        const profitRate = ((profit / this.inputMoney) * 100).toFixed(1);
        return profitRate; 
    }

    
}

module.exports = GameController;