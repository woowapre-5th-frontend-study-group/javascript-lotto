const { ERROR_MESSAGE } = require("../utils/constants");
const { Console } = require("@woowacourse/mission-utils");

class Lotto {
    #numbers;

    constructor(numbers) {
        this.validate(numbers);
        this.#numbers = numbers;
        this.bonus = 0;
    }

    validate(guess) {        
        guess.forEach(element => {  
            if (isNaN(element)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
        });

        console.log(guess);
        this.checkDuplicate(guess);
   }

   checkDuplicate(numbers) {
        if ([...new Set(numbers)].length !== 6) {
            Console.close();
            throw new Error(ERROR_MESSAGE.DUPLICATED);
        }
    }

    getGuess() {
        return this.#numbers;
    }

    setBonus(bonus) {
        this.bonus = bonus;
    }
    getBonus() {
        return this.bonus;
    }

}

module.exports = Lotto;