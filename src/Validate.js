const { THOUSAND } = require("./lib/constants");

class Validate {
  static isThousandUnit(number) {
    return number % THOUSAND === 0;
  }
}

module.exports = Validate;
