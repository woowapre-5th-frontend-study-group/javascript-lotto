const { Console } = require('@woowacourse/mission-utils');
const checkValue = require('./libs/checkValue');
const exitWithError = require('./libs/exitWithError');
const { LOTTO_NUMBER } = require('./libs/const');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    const { errorMsg } = checkValue.numbers(numbers, LOTTO_NUMBER);

    if (errorMsg) exitWithError(errorMsg);
  }

  printNumbers() {
    this.sortNumbers();

    Console.print(`[${this.#numbers.join(', ')}]`);
  }

  sortNumbers() {
    this.#numbers.sort((a, b) => a - b);
  }

  getResult(winningNumbers, bonusNumber) {
    let winninCount = 0;

    this.#numbers.forEach((number) => {
      if (winningNumbers.includes(number)) winninCount += 1;
    });

    if (winninCount < 3) return null;

    if (winninCount === 6) return 1;

    if (winninCount === 5 && this.#numbers.includes(bonusNumber)) return 2;

    return 8 - winninCount;
  }
}

module.exports = Lotto;
