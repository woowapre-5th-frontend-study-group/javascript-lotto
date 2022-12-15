class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  getWinningLotto() {
    return this.#numbers;
  }

  validate(numbers) {
    this.isRightLength(numbers);
    this.isNumeric(numbers);
    this.isDuplicated(numbers);
    this.isInRange(numbers);
  }
  isRightLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }
  isNumeric(numbers) {
    numbers.forEach((number) => {
      if (isNaN(number)) {
        throw new Error("[ERROR] 로또 번호는 숫자로만 이루어질 수 있습니다.");
      }
    });
  }
  isDuplicated(numbers) {
    let set = new Set(numbers);
    set = [...set];

    if (numbers.length !== set.length) {
      throw new Error("[ERROR] 로또 번호는 중복되어서는 안됩니다");
    }
  }
  isInRange(numbers) {
    numbers.forEach((number) => {
      if (!(number >= 1 && number <= 45)) {
        throw new Error(
          "[ERROR] 로또 번호는 1이상 45이하의 숫자로만 이루어질 수 있습니다."
        );
      }
    });
  }

  // TODO: 추가 기능 구현
}

module.exports = Lotto;
