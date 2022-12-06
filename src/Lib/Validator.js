const { convertToNumberArray } = require('../Lib/Utils');

/**
 *
 * @param {string} source
 * @returns {boolean}
 */
function isNumberic(source) {
  const sourceToNumber = Number(source);

  return (
    !Number.isNaN(sourceToNumber) &&
    Number.isInteger(sourceToNumber) &&
    Number.isFinite(sourceToNumber)
  );
}

/**
 *
 * @param {string} source
 * @returns {boolean}
 */
function isNumbericArray(source) {
  const numbericArray = source.split(',');

  return numbericArray.every((number) => isNumberic(number));
}

/**
 *
 * @param {string} source
 * @returns {boolean}
 */
function isNull(source) {
  return source === '';
}

/**
 *
 * @param {string} source
 * @param {number} threshold
 * @returns {boolean}
 */
function isUnder(source, threshold) {
  return Number(source) < threshold;
}

/**
 *
 * @param {string} source
 * @param {number} operand
 * @returns {boolean}
 */
function canDivide(source, operand) {
  return Number(source) % operand === 0;
}

/**
 *
 * @param {Array<T>} source
 * @param {number} length
 * @returns {boolean}
 */
function isLength(source, length) {
  return source.length === length;
}

/**
 *
 * @param {string} source
 * @param {number} inclusiveLower
 * @param {number} inclusidveUppper
 * @returns {boolean}
 */
function isInRange(source, inclusiveLower, inclusiveUppper) {
  return inclusiveLower <= Number(source) && Number(source) <= inclusiveUppper;
}

class Validator {
  /** @type {string} */
  #data;

  /** @type {boolean} */
  #error;

  /**
   *
   * @param {string} data
   */
  constructor(data) {
    this.#data = data.trim();
    this.#error = false;
  }

  #causeErrorFlag() {
    this.#error = true;
  }

  shouldBeNotNull() {
    if (isNull(this.#data)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeNumberic() {
    if (!isNumberic(this.#data)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeNumbericArray() {
    if (!isNumbericArray(this.#data)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeNotUnder(threshold) {
    if (isUnder(this.#data, threshold)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeDividedBy(operand) {
    if (!canDivide(this.#data, operand)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeLength(length) {
    if (!isLength(this.#data.split(','), length)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeInRange(inclusiveLower, inclusiveUppper) {
    if (!isInRange(this.#data, inclusiveLower, inclusiveUppper)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeInRangeArray(inclusiveLower, inclusidveUppper) {
    const numberArray = this.#data.split(',');
    const hasError = numberArray.some(
      (number) => !isInRange(number, inclusiveLower, inclusidveUppper)
    );

    if (hasError) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeFormatted() {
    if (!this.#data.includes(',')) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldNotDuplicate() {
    const numberArray = convertToNumberArray(this.#data);
    const arraySet = new Set(numberArray);

    if (arraySet.size !== numberArray.length) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldNotInclude(array) {
    const hasNumber = array.some((number) => number === Number(this.#data));
    if (hasNumber) {
      this.#causeErrorFlag();
    }

    return this;
  }

  withMessage(message) {
    if (this.#error) {
      throw message;
    }

    return this;
  }
}

module.exports = Validator;
