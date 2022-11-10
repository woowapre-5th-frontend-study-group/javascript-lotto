const { Console } = require('@woowacourse/mission-utils');
const validation = require('./libs/validation');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    validation.checkNumberList(numbers);
  }

  printNumbers() {
    this.sortNumbers();

    Console.print(`[${this.#numbers.join(', ')}]`);
  }

  sortNumbers() {
    this.#numbers.sort((a, b) => a - b);
  }
}

module.exports = Lotto;
