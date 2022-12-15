class LottoMachine {
  constructor(money) {
    this.quantity = this.getQuantity(money);
  }

  getQuantity(money) {
    const quantity = money / 1000;
    return quantity;
  }
}

module.exports = LottoMachine;
