const MissionUtils = require("@woowacourse/mission-utils");

class LottoMachine {
  #issuedLottos;

  constructor(money) {
    this.validate(money);
    this.money = money;
    this.quantity = this.getQuantity(money);
    this.#issuedLottos = this.makeLottos();
  }

  validate(money) {
    if (isNaN(money)) {
      throw new Error("[ERROR] 구매 금액은 숫자이어야 합니다.");
    }
    if (money < 1000) {
      throw new Error("[ERROR] 구매 금액은 1000원 이상이어야 합니다.");
    }
    if (money % 1000) {
      throw new Error("[ERROR] 구매 금액의 단위는 1000원입니다.");
    }
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
