const { LOTTO_NUMBER, PLACE, SEPARATOR } = require('../libs/const');
const Validator = require('../libs/Validator');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    Validator.numbers(numbers, LOTTO_NUMBER);
  }

  getNumbers() {
    this.#numbers.sort((a, b) => a - b);

    return (
      SEPARATOR.lottoStart +
      this.#numbers.join(SEPARATOR.lottoNumber) +
      SEPARATOR.lottoEnd
    );
  }

  getRank(winningNumbers, bonusNumber) {
    winningNumbers = new Set(winningNumbers);
    let count = 0;

    this.#numbers.forEach((number) => {
      if (winningNumbers.has(number)) count += 1;
    });

    return this.calRank(count, bonusNumber);
  }

  calRank(count, bonusNumber) {
    if (count < 3) return;

    if (count === 6) return PLACE.FIRST;

    if (count === 5 && hasBonusNumber(bonusNumber)) return PLACE.SECOND;

    return 8 - count;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

module.exports = Lotto;
