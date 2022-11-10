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

  getResult(winningNumberList, bonusNumber) {
    let winninCount = 0;

    this.#numbers.forEach((number) => {
      if (winningNumberList.includes(number)) winninCount += 1;
    });

    if (winninCount < 3) return null;

    if (winninCount === 6) return 1;

    if (winninCount === 5 && this.#numbers.includes(bonusNumber)) return 2;

    return 8 - winninCount;
  }
}

module.exports = Lotto;
