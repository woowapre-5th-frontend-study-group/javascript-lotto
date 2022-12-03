const validation = {
  money(money) {
    if (!/^[0-9]+$/.test(money)) throw new Error('[ERROR] 숫자');

    if (money < 1000) throw new Error('[ERROR] 최소 구매 금액');

    if (money % 1000 !== 0) throw new Error('[ERROR] 단위');
  },

  winningNumbers(winningNumbers) {
    if (new Set(winningNumbers).size !== 6)
      throw new Error('[ERROR] 개수, 중복');

    if (winningNumbers.some((winningNumber) => !/^[0-9]+$/.test(winningNumber)))
      throw new Error('[ERROR] 숫자');
  },

  bonusNumber(winningNumbers, bonusNumber) {
    if (bonusNumber < 0 || bonusNumber > 45) throw new Error('[ERROR] 범위');

    if (!/^[0-9]+$/.test(bonusNumber)) throw new Error('[ERROR] 숫자');

    if (winningNumbers.includes(bonusNumber)) throw new Error('[ERROR] 포함');
  },
};

module.exports = validation;
