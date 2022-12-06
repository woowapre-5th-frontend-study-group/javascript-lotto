class Bonus {
  #number;

  constructor(number) {
    this.validate(number);
    this.#number = number;
  }

  validate(number) {
    if (isNaN(number)) {
      throw new Error("[ERROR] 보너스 번호는 숫자이어야 합니다");
    }
  }
}

module.exports = Bonus;
