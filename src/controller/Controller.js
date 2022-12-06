const Calculator = require("../util/Calculator");
const InputView = require("../view/InputView");
const OutputView = require("../view/OutputView");

class Controller {
  startGame() {
    this.inputPurchaseAmout();
  }

  inputPurchaseAmout() {
    InputView.inputPurchaseAmout(this.printPurchaseQuantity.bind(this));
  }

  printPurchaseQuantity(purchaseAmount) {
    const purchaseQuantity = Calculator.purchaseQuantity(purchaseAmount);
    OutputView.purchaseQuantity(purchaseQuantity);
  }
}

const controller = new Controller();
controller.startGame();

module.exports = Controller;
