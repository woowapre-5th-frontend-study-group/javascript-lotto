const LottoController = require("./Controller/LottoController");

class App {
  play() {
    LottoController.start();
  }
}

module.exports = App;
