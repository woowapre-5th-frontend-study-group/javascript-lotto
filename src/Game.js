const { Console } = require('@woowacourse/mission-utils');

class Game {
  constructor() {
    this.lotteCount = null;
  }

  setLotteCount(money) {
    this.validateMoney(money);
    this.lotteCount = money / 1000;
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

  printLotteCount() {
    Console.print(`\n${this.lotteCount}개를 구매했습니다.`);
  }
}

module.exports = Game;
