const { Random } = require('@woowacourse/mission-utils');

class Lotto {
  #number;

  constructor(lottoNumbers) {
    this.#number = lottoNumbers;
    this.#sortNumber();
  }

  #sortNumber() {
    this.#number = this.#number.sort((a, b) => a - b);
  }

  compareLotto(otherLotto) {
    const lottoSet = new Set(this.#number);
    const otherLottoNumbers = otherLotto.getNumber();

    const matchCount = otherLottoNumbers.filter((lottoNumber) =>
      lottoSet.has(lottoNumber)
    ).length;

    return matchCount;
  }

  includeNumber(lottoNumber) {
    return new Set(this.#number).has(lottoNumber);
  }

  getNumber() {
    return this.#number;
  }

  toString() {
    return `[${this.#number.join(', ')}]`;
  }

  static createRandomLotto() {
    return Random.pickUniqueNumbersInRange(1, 45, 6);
  }
}

module.exports = Lotto;
