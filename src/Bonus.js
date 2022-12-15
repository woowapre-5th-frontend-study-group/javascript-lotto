class Bonus {
  #number;

  constructor(number) {
    this.validate(number);
    this.#number = number;
  }

  getBonusNumber() {
    return this.#number;
  }

  validate(number) {
    if (isNaN(number)) {
      throw new Error("[ERROR] 보너스 번호는 숫자이어야 합니다.");
    }
  }

  // TODO: 추가 기능 구현
}

module.exports = Bonus;
