const Controller = require("./controller/Controller");

class App {
  #controller = new Controller();

  play() {
    this.#controller.startGame();
  }
}

module.exports = App;

const app = new App();
app.play();
