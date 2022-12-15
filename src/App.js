const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");

class App {
  play() {
    this.readPurchaseAmount();
  }

  readPurchaseAmount() {
    InputView.readPurchaseAmount();
  }
}

const app = new App();
app.play();

module.exports = App;
