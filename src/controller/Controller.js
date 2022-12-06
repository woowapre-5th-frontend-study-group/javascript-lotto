const Calculator = require("../util/Calculator");
const InputView = require("../view/InputView");
const LottoMachine = require("../util/LottoMachine");
const OutputView = require("../view/OutputView");

class Controller {
  startGame() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    InputView.inputPurchaseAmount(this.printPurchaseQuantity.bind(this));
  }

  printPurchaseQuantity(purchaseAmount) {
    const purchaseQuantity = Calculator.purchaseQuantity(purchaseAmount);
    OutputView.purchaseQuantity(purchaseQuantity);

    this.printUserLotto(purchaseQuantity);
  }

  printUserLotto(purchaseQuantity) {
    //여기서 for문을 쓰는게 맞는지...
    for (let i = 0; i < purchaseQuantity; i++) {
      const lottoNumber = LottoMachine.lottoNumber();
      OutputView.lottoNumber(lottoNumber);
    }
  }
}

const controller = new Controller();
controller.startGame();

module.exports = Controller;
