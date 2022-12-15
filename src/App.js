const Lotto = require("./Lotto");
const LottoMachine = require("./LottoMachine");

const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");

class App {
  #lottoMachine;
  #lottoGame;

  play() {
    this.readPurchaseAmount();
  }

  readPurchaseAmount() {
    InputView.readPurchaseAmount(this.printQuantity.bind(this));
  }

  printQuantity(money) {
    this.#lottoMachine = new LottoMachine(Number(money));
    const purchaseQuantity = this.#lottoMachine.quantity;

    OutputView.printEmptyLine();
    OutputView.printPurchaseQuantity(purchaseQuantity);
  }
}

const app = new App();
app.play();

module.exports = App;
