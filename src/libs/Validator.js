const { Quit } = require('../View/IOView');
const {
  ERROR_MESSAGE,
  BONUS_NUMBER,
  PURCHASE_MONEY,
  MONEY,
  LOTTO,
} = require('./const');

const Validator = {
  money(money) {
    this.checkNumberType(money);

    this.checkMoneyRange(money);

    this.checkMoneyUnit(money);
  },

  numbers(numbers, name) {
    this.checkNumbersType(numbers, name);

    this.checkNumbersLength(numbers, name);

    this.checkNumbersOverlap(numbers, name);

    this.checkNumbersRange(numbers, name);
  },

  bonusNumber(number, winningNumbers) {
    this.checkNumberType(number);

    this.checkOverlapWithWinningNumbers(number, winningNumbers);

    this.checkBonusNumberRange(number);
  },

  checkNumberType(money) {
    if (Number.isNaN(money))
      return Quit.withErrorMessage(createErrorMsg.type(PURCHASE_MONEY));
  },

  checkMoneyRange(money) {
    if (money < MONEY.MIN)
      return Quit.withErrorMessage(ERROR_MESSAGE.MIN_MONEY);
  },

  checkMoneyUnit(money) {
    if (money % MONEY.UNIT)
      return Quit.withErrorMessage(ERROR_MESSAGE.UNIT_MONEY);
  },

  checkNumbersType(numbers, name) {
    if (!this.isNumberType(numbers))
      return Quit.withErrorMessage(createErrorMsg.type(name));
  },

  checkNumbersLength(numbers, name) {
    if (numbers.length !== LOTTO.NUMBERS_COUNT)
      return Quit.withErrorMessage(createErrorMsg.length(name));
  },

  checkNumbersOverlap(numbers, name) {
    if ([...new Set(numbers)].length !== LOTTO.NUMBERS_COUNT)
      return Quit.withErrorMessage(createErrorMsg.overlap(name));
  },

  checkNumbersRange(numbers, name) {
    if (!this.isCorrectRange(numbers))
      return Quit.withErrorMessage(createErrorMsg.range(name));
  },

  checkOverlapWithWinningNumbers(number, winningNumbers) {
    if (winningNumbers.includes(number))
      return Quit.withErrorMessage(ERROR_MESSAGE.INCLUDE_WINNING_NUMBER);
  },

  checkBonusNumberRange(number) {
    if (number > LOTTO.MAX_NUMBER || number < LOTTO.MIN_NUMBER)
      return Quit.withErrorMessage(createErrorMsg.range(BONUS_NUMBER));
  },

  isNumberType(numbers) {
    return numbers.every((number) => !Number.isNaN(number));
  },

  isCorrectRange(numbers) {
    return numbers.every(
      (number) => number <= LOTTO.MAX_NUMBER && number >= LOTTO.MIN_NUMBER
    );
  },
};

const createErrorMsg = {
  range: (name) => {
    return `${name}: ${LOTTO.MIN_NUMBER}~${LOTTO.MAX_NUMBER} 사이의 값만 입력할 수 있습니다.`;
  },

  type: (name) => {
    return `${name}: 숫자만 입력할 수 있습니다.`;
  },

  length: (name) => {
    return `${name}: ${LOTTO.NUMBERS_COUNT}개의 숫자로 이루어져야 합니다.`;
  },

  overlap: (name) => {
    return `${name}: 중복되지 않는 숫자로 이루어져야 합니다.`;
  },
};

module.exports = Validator;
