class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (this.isNumbersLengthSix(numbers) && this.isUniqueNumbers(numbers)) {
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

  getNumber() {
    return this.#numbers;
  }
}

module.exports = Lotto;
