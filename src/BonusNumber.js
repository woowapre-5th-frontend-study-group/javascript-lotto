const validation = require('./libs/validation');

class BonusNumber {
  constructor(bonusNumber, winningNumbers) {
    validation.checkBonusNumber(bonusNumber, winningNumbers);
    this.value = bonusNumber;
  }
}

module.exports = BonusNumber;
