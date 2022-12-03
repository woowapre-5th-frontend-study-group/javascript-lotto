const GameController = require("./Controller/GameController");

class App {
    play() {
        GameController.startGame();
    }
}

const app = new App();
app.play();

module.exports = App;