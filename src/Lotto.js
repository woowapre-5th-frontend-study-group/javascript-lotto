const { Console } = require('@woowacourse/mission-utils');
const { VALIDATE_TYPE } = require('./Validation');

const HandleException = require('./HandleException');

class Lotto {
    #numbers;

    constructor(numbers) {
        this.setNumbers(numbers);
        this.validate();
    }

    setNumbers(numbers) {
        this.#numbers = numbers;
    }

    getNumbers() {
        return this.#numbers;
    }

    validate() {
        const numbers = this.getNumbers();
        const handleException = new HandleException();
        handleException.tryValidate(numbers, VALIDATE_TYPE.LOTTO);
    }

    compareLotto(winningLotto) {
        const numbers = this.getNumbers();
        const matchCount = numbers.filter((number) => winningLotto.includes(number)).length;

        return matchCount;
    }

    hasNumber(number) {
        const numbers = this.getNumbers();
        return numbers.includes(number);
    }

    printLotto() {
        Console.print(`[${this.#numbers.join(', ')}]`);
    }
}

module.exports = Lotto;
