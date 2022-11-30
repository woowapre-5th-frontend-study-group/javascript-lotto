const Quit = require('./Quit');
const {
  ERROR_MESSAGE,
  BONUS_NUMBER,
  PURCHASE_MONEY,
  MONEY,
  LOTTO,
} = require('./const');

const Validator = {
  money(money) {
    if (isNaN(money))
      return Quit.withErrorMessage(createErrorMsg.type(PURCHASE_MONEY));

    if (money < MONEY.MIN)
      return Quit.withErrorMessage(ERROR_MESSAGE.MIN_MONEY);

    if (money % MONEY.UNIT)
      return Quit.withErrorMessage(ERROR_MESSAGE.UNIT_MONEY);
  },

  numbers(numbers, name) {
    if (!isNumberType(numbers))
      return Quit.withErrorMessage(createErrorMsg.type(name));

    if (
      numbers.length !== LOTTO.NUMBERS_COUNT ||
      [...new Set(numbers)].length !== LOTTO.NUMBERS_COUNT
    )
      return Quit.withErrorMessage(createErrorMsg.length(name));

    if (!isCorrectRange(numbers))
      return Quit.withErrorMessage(createErrorMsg.range(name));
  },

  bonusNumber(number, winningNumbers) {
    if (isNaN(number))
      return Quit.withErrorMessage(createErrorMsg.type(BONUS_NUMBER));

    if (winningNumbers.includes(number))
      return Quit.withErrorMessage(ERROR_MESSAGE.INCLUDE_WINNING_NUMBER);

    if (number > LOTTO.MAX_NUMBER || number < LOTTO.MIN_NUMBER)
      return Quit.withErrorMessage(createErrorMsg.range(BONUS_NUMBER));
  },
};

const isNumberType = (numbers) => {
  return numbers.every((number) => !isNaN(number));
};

const isCorrectRange = (numbers) => {
  return numbers.every(
    (number) => number <= LOTTO.MAX_NUMBER && number >= LOTTO.MIN_NUMBER
  );
};

const createErrorMsg = {
  range: (name) => {
    return `[ERROR] ${name}: ${LOTTO.MIN_NUMBER}~${LOTTO.MAX_NUMBER} 사이의 값만 입력할 수 있습니다.`;
  },

  type: (name) => {
    return `[ERROR] ${name}: 숫자만 입력할 수 있습니다.`;
  },

  length: (name) => {
    return `[ERROR] ${name}: 중복되지 않은 ${LOTTO.NUMBERS_COUNT}개의 숫자로 이루어져야 합니다.`;
  },
};

module.exports = Validator;
