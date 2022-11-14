const { ERROR_MESSAGE, MONEY, BONUS_NUMBER } = require('./const');

const checkValue = {
  money(money) {
    if (isNaN(money)) return { errorMsg: createErrorMsg.type(MONEY) };

    if (money < 1000) return { errorMsg: ERROR_MESSAGE.MIN_MONEY };

    if (money % 1000) return { errorMsg: ERROR_MESSAGE.UNIT_MONEY };

    return { errorMsg: undefined };
  },

  numbers(numbers, name) {
    if (!isNumberType(numbers)) return { errorMsg: createErrorMsg.type(name) };

    if (numbers.length !== 6 || [...new Set(numbers)].length !== 6)
      return {
        errorMsg: createErrorMsg.length(name),
      };

    if (!isCorrectRange(numbers))
      return {
        errorMsg: createErrorMsg.range(name),
      };

    return { errorMsg: undefined };
  },

  bonusNumber(number, winningNumbers) {
    if (isNaN(number)) return { errorMsg: createErrorMsg.type(BONUS_NUMBER) };

    if (winningNumbers.includes(number))
      return {
        errorMsg: ERROR_MESSAGE.INCLUDE_WINNING_NUMBER,
      };

    if (number > 45 || number < 1)
      return {
        errorMsg: createErrorMsg.range(BONUS_NUMBER),
      };

    return { errorMsg: undefined };
  },
};

const isNumberType = (numbers) => {
  return numbers.every((number) => !isNaN(number));
};

const isCorrectRange = (numbers) => {
  return numbers.every((number) => number <= 45 && number >= 1);
};

const createErrorMsg = {
  range: (name) => {
    return `[ERROR] ${name}: 1~45 사이의 값만 입력할 수 있습니다.`;
  },

  type: (name) => {
    return `[ERROR] ${name}: 숫자만 입력할 수 있습니다.`;
  },

  length: (name) => {
    return `[ERROR] ${name}: 중복되지 않은 6개의 숫자로 이루어져야 합니다.`;
  },
};

module.exports = checkValue;
