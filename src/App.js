const ControllerHandler = require("./Controller");

class App {
  play() {
    ControllerHandler.initializeHandler();
    ControllerHandler.startService();
  }
}

module.exports = App;
