class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  bonusNumberValidate(number) {
    if (isNaN(number)) {
      throw new Error("[ERROR] 보너스 번호는 숫자이어야 합니다.");
    }
  }
}

module.exports = Lotto;
