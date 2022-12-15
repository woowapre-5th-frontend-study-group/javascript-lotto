class Bonus {
  #number;

  constructor(number, winningLotto) {
    this.validate(number, winningLotto);
    this.#number = number;
  }

  validate(number, winningLotto) {
    if (isNaN(number)) {
      throw new Error("[ERROR] 보너스 번호는 숫자이어야 합니다.");
    }
    if (winningLotto.includes(number)) {
      throw new Error(
        "[ERROR] 보너스 번호와 당첨번호가 중복되어서는 안됩니다."
      );
    }
    if (!(number >= 1 && number <= 45)) {
      throw new Error(
        "[ERROR] 보너스 번호는 1이상 45이하의 숫자로만 입력 가능합니다."
      );
    }
  }

  getBonusNumber() {
    return this.#number;
  }

  // TODO: 추가 기능 구현
}

module.exports = Bonus;
