class Validate {
  static isMoneyUnit(money, unit) {
    return money % unit === 0;
  }
}

module.exports = Validate;
