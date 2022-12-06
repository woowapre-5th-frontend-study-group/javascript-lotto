/** IMPORT VIEW */
const { OutputView } = require('../Views/IOView');

/** IMPORT UTILS */
const Validator = require('../Lib/Validator');

/** IMPORT CONSTANTS */
const { LOTTO, VALIDATION } = require('../Constants');

/** 예외 책임 핸들러 */
const ExceptionHandler = {
  /**
   * 입력받은 금액에 대한 유효성 검사를 진행합니다.
   *
   * Expected input: '4000', '5000', ...
   *
   * @param {string} userCache
   * @returns {boolean}
   */
  validateUserCache(userCache) {
    try {
      new Validator(userCache)
        .shouldBeNotNull()
        .withMessage(VALIDATION.MESSAGE.NULL)
        .shouldBeNumberic()
        .withMessage(VALIDATION.MESSAGE.NOT_NUMBERIC)
        .shouldBeNotUnder(LOTTO.CAHCE.MINIMUM)
        .withMessage(VALIDATION.MESSAGE.UNDER_THOUSAND)
        .shouldBeDividedBy(LOTTO.CAHCE.BASE_UNIT)
        .withMessage(VALIDATION.MESSAGE.NOT_DIVIDED_THOUSAND);
    } catch (error) {
      OutputView.printError(error);
      return false;
    }

    return true;
  },

  /**
   * 입력받은 당첨 번호에 대한 유효성 검사를 진행합니다.
   *
   * Expected input: '1,2,3,4,5,6', ...
   *
   * @param {string} winningNumbers
   * @returns {boolean}
   */
  validateWinningNumbers(winningNumbers) {
    const { INCLUSIVE_LOWER_NUMBER, INCLUSIVE_UPPER_NUMBER } = LOTTO;

    try {
      new Validator(winningNumbers)
        .shouldBeNotNull()
        .withMessage(VALIDATION.MESSAGE.NULL)
        .shouldBeFormatted()
        .withMessage(VALIDATION.MESSAGE.NOT_FORMATTED)
        .shouldBeLength(LOTTO.NUMBER_COUNT)
        .withMessage(VALIDATION.MESSAGE.NOT_SIX_LENGTH)
        .shouldBeNumbericArray()
        .withMessage(VALIDATION.MESSAGE.INCLUDED_NOT_NUMBER)
        .shouldBeInRangeArray(INCLUSIVE_LOWER_NUMBER, INCLUSIVE_UPPER_NUMBER)
        .withMessage(VALIDATION.MESSAGE.NOT_IN_RANGE_ARRAY)
        .shouldNotDuplicate()
        .withMessage(VALIDATION.MESSAGE.HAS_DUPLICATION);
    } catch (error) {
      OutputView.printError(error);
      return false;
    }

    return true;
  },

  /**
   * 입력받은 보너스 번호에 대한 유효성 검사를 진행합니다.
   *
   * Expected input: '7', ...
   *
   * @param {Array<Integer>} winningNumbers
   * @param {string} bonusNumber
   * @returns {boolean}
   */
  validateBonusNumber(winningNumbers, bonusNumber) {
    const { INCLUSIVE_LOWER_NUMBER, INCLUSIVE_UPPER_NUMBER } = LOTTO;

    try {
      new Validator(bonusNumber)
        .shouldBeNotNull()
        .withMessage(VALIDATION.MESSAGE.NULL)
        .shouldBeNumberic()
        .withMessage(VALIDATION.MESSAGE.NOT_NUMBERIC)
        .shouldBeInRange(INCLUSIVE_LOWER_NUMBER, INCLUSIVE_UPPER_NUMBER)
        .withMessage(VALIDATION.MESSAGE.NOT_IN_RANGE)
        .shouldNotInclude(winningNumbers)
        .withMessage(VALIDATION.MESSAGE.INCLUDED_WINNING_NUMBER);
    } catch (error) {
      OutputView.printError(error);
      return false;
    }

    return true;
  },
};

module.exports = ExceptionHandler;
