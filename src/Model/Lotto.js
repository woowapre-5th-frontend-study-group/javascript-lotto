class Lotto {
    #numbers;

    constructor(numbers) {
        this.#numbers = numbers;
        this.bonus = 0;
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