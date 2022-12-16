const { MONEY_UNIT, ERROR_MESSAGE } = require("./constants");

const InputValidation = {
    isValidBonus(bonus, guess) {
        this.isValidNum(bonus);
        if (guess.includes(bonus)) throw new Error(ERROR_MESSAGE.BONUS_ERROR);
    },

    isValidUnit(money) {
        if (money % MONEY_UNIT != 0) throw new Error(ERROR_MESSAGE.UNIT_ERROR);
    },

    isValidNum(money) {
        if (isNaN(money)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    },

    isValidPurchase(money) {
        this.isValidNum(money);
        this.isValidUnit(money);

    }
}

module.exports = InputValidation;