const validation = require('./libs/validation');

class WinningNumbers {
  constructor(numbers) {
    validation.checkNumberList(numbers);
    this.value = numbers;
  }
}

module.exports = WinningNumbers;
