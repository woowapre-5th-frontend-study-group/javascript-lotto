const InputView = require("../view/InputView");
const OutputView = require("../view/OutputView");

class Controller {
  startGame() {
    this.inputPrice();
  }

  inputPrice() {
    InputView.inputPrice(this.showPurchaseAmount.bind(this));
  }

  showPurchaseAmount() {}
}

const controller = new Controller();
controller.startGame();

module.exports = Controller;
