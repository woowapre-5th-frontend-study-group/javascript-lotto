const { LOTTO } = require("./utils/constants");

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (
      this.isNumbersLengthSix(numbers) &&
      this.isUniqueNumbers(numbers) &&
      this.isNumberRange(numbers)
    ) {
      return;
    }
    throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
  }

  isNumbersLengthSix(numbers) {
    return numbers.length === 6;
  }

  isUniqueNumbers(numbers) {
    const deduplicationNumbers = new Set(numbers);
    return deduplicationNumbers.size === 6;
  }

  isNumberRange(numbers) {
    const minNumber = Math.min(...numbers);
    const maxNumber = Math.max(...numbers);
    return (
      LOTTO.NUMBER_RANGE.START <= minNumber &&
      maxNumber <= LOTTO.NUMBER_RANGE.END
    );
  }

  getNumber() {
    return this.#numbers;
  }
}

module.exports = Lotto;
