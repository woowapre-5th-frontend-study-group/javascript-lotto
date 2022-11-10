const { Console } = require('@woowacourse/mission-utils');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (numbers.length !== 6)
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');

    if ([...new Set(numbers)].length !== 6)
      throw new Error(
        '[ERROR] 로또 번호는 중복되지 않은 숫자로 이루어져야 합니다.'
      );

    if (!this.checkNumbersRange(numbers))
      throw new Error('[ERROR] 로또 번호의 범위는 1~45이어야 합니다.');

    if (!this.checkNumbersType(numbers))
      throw new Error('[ERROR] 로또 번호는 숫자이어야 합니다.');
  }

  checkNumbersRange(numbers) {
    return numbers.every((number) => number <= 45 && number >= 1);
  }

  checkNumbersType(numbers) {
    return numbers.every((number) => !isNaN(number));
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
