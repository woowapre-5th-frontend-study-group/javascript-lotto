/** IMPORT UTILS */
const { convertToNumberArray } = require('../Lib/Utils');

/** IMPORT CONSTANTS */
const { VALIDATION } = require('../Constants');

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
  const numbericArray = source.split(VALIDATION.DELIMITER);

  return numbericArray.every((number) => isNumberic(number));
}

/**
 *
 * @param {string} source
 * @returns {boolean}
 */
function isNull(source) {
  return source === VALIDATION.NULL;
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

/** 유효성 검사를 하는 클래스 */
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

  /**
   *
   * @param {number} threshold
   * @returns
   */
  shouldBeNotUnder(threshold) {
    if (isUnder(this.#data, threshold)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  /**
   *
   * @param {number} operand
   * @returns
   */
  shouldBeDividedBy(operand) {
    if (!canDivide(this.#data, operand)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  /**
   *
   * @param {number} length
   * @returns
   */
  shouldBeLength(length) {
    const dataArray = this.#data.split(VALIDATION.DELIMITER);

    if (!isLength(dataArray, length)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  /**
   *
   * @param {number} inclusiveLower
   * @param {number} inclusiveUppper
   * @returns
   */
  shouldBeInRange(inclusiveLower, inclusiveUppper) {
    if (!isInRange(this.#data, inclusiveLower, inclusiveUppper)) {
      this.#causeErrorFlag();
    }

    return this;
  }

  /**
   *
   * @param {number} inclusiveLower
   * @param {number} inclusiveUppper
   * @returns
   */
  shouldBeInRangeArray(inclusiveLower, inclusiveUppper) {
    const numberArray = this.#data.split(VALIDATION.DELIMITER);
    const hasError = numberArray.some(
      (number) => !isInRange(number, inclusiveLower, inclusiveUppper)
    );

    if (hasError) {
      this.#causeErrorFlag();
    }

    return this;
  }

  shouldBeFormatted() {
    if (!this.#data.includes(VALIDATION.DELIMITER)) {
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

  /**
   *
   * @param {Array<T>} array
   * @returns
   */
  shouldNotInclude(array) {
    const hasNumber = array.some((number) => number === Number(this.#data));
    if (hasNumber) {
      this.#causeErrorFlag();
    }

    return this;
  }

  /**
   *
   * @param {string} message
   * @returns
   */
  withMessage(message) {
    if (this.#error) {
      throw message;
    }

    return this;
  }
}

module.exports = Validator;
