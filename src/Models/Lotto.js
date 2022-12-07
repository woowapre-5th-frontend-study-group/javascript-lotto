/** IMPORT UTILS */
const { Random } = require('@woowacourse/mission-utils');

/** IMPORT CONSTANTS */
const { LOTTO } = require('../Constants');

class Lotto {
  #number;

  /**
   *
   * @param {Array<number>} lottoNumbers
   */
  constructor(lottoNumbers) {
    this.#number = lottoNumbers;
    this.#sortNumber();
  }

  #sortNumber() {
    this.#number = this.#number.sort((a, b) => a - b);
  }

  /**
   *
   * @param {Lotto} otherLotto
   * @returns
   */
  compareLotto(otherLotto) {
    const lottoSet = new Set(this.#number);
    const otherLottoNumbers = otherLotto.getNumber();

    const matchCount = otherLottoNumbers.filter((lottoNumber) =>
      lottoSet.has(lottoNumber)
    ).length;

    return matchCount;
  }

  /**
   *
   * @param {number} lottoNumber
   * @returns
   */
  includeNumber(lottoNumber) {
    return new Set(this.#number).has(lottoNumber);
  }

  getNumber() {
    return this.#number;
  }

  toString() {
    const { SQUARE_BRACKET_OPEN, DELIMITER, SQUARE_BRACKET_CLOSE } =
      LOTTO.FORMAT;
    return `${SQUARE_BRACKET_OPEN}${this.#number.join(
      DELIMITER
    )}${SQUARE_BRACKET_CLOSE}`;
  }

  static createRandomLotto() {
    const { INCLUSIVE_LOWER_NUMBER, INCLUSIVE_UPPER_NUMBER, NUMBER_COUNT } =
      LOTTO;

    return Random.pickUniqueNumbersInRange(
      INCLUSIVE_LOWER_NUMBER,
      INCLUSIVE_UPPER_NUMBER,
      NUMBER_COUNT
    );
  }
}

module.exports = Lotto;
