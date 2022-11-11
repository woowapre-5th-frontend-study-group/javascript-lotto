const validation = require('./libs/validation');

class BonusNumber {
  constructor(bonusNumber, winningNumbers) {
    this.validate(bonusNumber, winningNumbers);
    this.value = bonusNumber;
  }

  validate(bonusNumber, winningNumbers) {
    validation.checkBonusNumber(bonusNumber, winningNumbers);
  }
}

module.exports = BonusNumber;
