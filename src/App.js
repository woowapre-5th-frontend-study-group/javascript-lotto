const GameController = require("./Controller/GameController");

class App {
    play() {
        new GameController().startGame();
    }
}

const app = new App();
app.play();

module.exports = App;