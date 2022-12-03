class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error();
    }
  }

  getNumbers() {
    this.#numbers.sort((a, b) => a - b);
    return `[${this.#numbers.join(', ')}]`;
  }

  getRank(winningNumbers, bonusNumber) {
    let count = 0;

    winningNumbers.forEach((winningNumber) => {
      winningNumber = Number(winningNumber);
      if (this.#numbers.includes(winningNumber)) count += 1;
    });

    if (count < 3) return;

    if (count === 6) return 1;
    if (count === 5 && this.#numbers.includes(bonusNumber)) return 2;
    if (count === 5) return 3;

    return 8 - count;
  }
}

module.exports = Lotto;
