const App = require('./App');

class Game {
  constructor() {
    this.lotteCount = null;
  }

  setLotteCount(money) {
    this.validateMoney(money);
  }

  validateMoney(money) {
    if (isNaN(money)) {
      throw new Error('[ERROR] 숫자만 입력할 수 있습니다.');
    }

    if (money < 1000) {
      throw new Error('[ERROR] 최소 구입금액은 1000원입니다.');
    }

    if (money % 1000 !== 0) {
      throw new Error('[ERROR] 1000원 단위로 로또를 구입해야 합니다.');
    }
  }
}

module.exports = Game;
