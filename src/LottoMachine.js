const MissionUtils = require("@woowacourse/mission-utils");

class LottoMachine {
  #issuedLottos;

  constructor(money) {
    this.money = money;
    this.quantity = this.getQuantity(money);
    this.#issuedLottos = this.makeLottos();
  }

  getIssuedLottos() {
    return this.#issuedLottos;
  }

  getQuantity(money) {
    const quantity = money / 1000;
    return quantity;
  }

  makeLottos() {
    let lottos = [];
    for (let i = 0; i < this.quantity; i++) {
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      numbers.sort((a, b) => a - b);
      lottos.push(numbers);
    }

    return lottos;
  }
}

module.exports = LottoMachine;
