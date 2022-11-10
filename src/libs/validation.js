const validation = {
  checkNumberList(numbers) {
    if (numbers.length !== 6)
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');

    if ([...new Set(numbers)].length !== 6)
      throw new Error(
        '[ERROR] 로또 번호는 중복되지 않은 숫자로 이루어져야 합니다.'
      );

    if (!checkNumbersRange(numbers))
      throw new Error('[ERROR] 로또 번호의 범위는 1~45이어야 합니다.');

    if (!checkNumbersType(numbers))
      throw new Error('[ERROR] 로또 번호는 숫자이어야 합니다.');
  },
};

function checkNumbersRange(numbers) {
  return numbers.every((number) => number <= 45 && number >= 1);
}

function checkNumbersType(numbers) {
  return numbers.every((number) => !isNaN(number));
}

module.exports = validation;
