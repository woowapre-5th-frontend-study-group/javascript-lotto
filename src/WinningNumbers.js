const validation = require('./libs/validation');

class WinningNumbers {
  constructor(numbers) {
    this.validate(numbers);
    this.value = numbers;
  }

  validate(numbers) {
    validation.checkNumberList(numbers);
  }
}

module.exports = WinningNumbers;
