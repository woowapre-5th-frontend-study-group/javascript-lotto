const { Console, Random } = require('@woowacourse/mission-utils');
const Lotto = require('./Lotto');

class Game {
  constructor() {
    this.lottoCount = null;
    this.lottoList = [];
  }

  setLottoCount(money) {
    this.validateMoney(money);
    this.lottoCount = money / 1000;

    this.publishLotto(this.lottoCount);
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

  printLottoCount() {
    Console.print(`\n${this.lottoCount}개를 구매했습니다.`);
  }

  publishLotto(lottoCount) {
    for (let num = 0; num < lottoCount; num++) {
      const newLotto = new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
      this.lottoList.push(newLotto);
    }
  }

  printLottoList() {
    this.lottoList.forEach((lotto) => {
      lotto.printNumbers();
    });
  }
}

module.exports = Game;
