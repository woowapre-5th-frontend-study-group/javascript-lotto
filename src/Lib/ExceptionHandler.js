const Validator = require('../Lib/Validator');
const { OutputView } = require('../Views/IOView');

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
        .withMessage('값을 입력해주세요~')
        .shouldBeNumberic()
        .withMessage('숫자여야 합니다~')
        .shouldBeNotUnder(1000)
        .withMessage('1,000원 이상은 구매하셔야 해요~')
        .shouldBeDividedBy(1000)
        .withMessage('1,000원 단위로만 입력해주세요~');
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
    try {
      new Validator(winningNumbers)
        .shouldBeNotNull()
        .withMessage('값을 입력해주세요~')
        .shouldBeFormatted()
        .withMessage('숫자와 쉼표(,)로만 입력해주세요~')
        .shouldBeLength(6)
        .withMessage('6개의 숫자를 입력해주세용')
        .shouldBeNumbericArray()
        .withMessage('숫자가 아닌 번호가 있습니당')
        .shouldBeInRangeArray(1, 45)
        .withMessage('1부터 45의 숫자가 아닌 번호가 있습니다.')
        .shouldNotDuplicate()
        .withMessage('중복 없이 입력해주세요');
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
    try {
      new Validator(bonusNumber)
        .shouldBeNotNull()
        .withMessage('값을 입력해주세요~')
        .shouldBeNumberic()
        .withMessage('숫자여야 합니다~')
        .shouldBeInRange(1, 45)
        .withMessage('1부터 45의 숫자여야 합니다.')
        .shouldNotInclude(winningNumbers)
        .withMessage('당첨 번호에 없는 번호여야 합니다.');
    } catch (error) {
      OutputView.printError(error);
      return false;
    }

    return true;
  },
};

module.exports = ExceptionHandler;
