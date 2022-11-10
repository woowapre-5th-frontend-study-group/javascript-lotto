const { Console } = require('@woowacourse/mission-utils');
const Game = require('./Game');

class App {
  constructor() {
    this.game = new Game();
  }

  play() {
    this.requestMoney();
  }

  requestMoney() {
    Console.readLine('구입금액을 입력해 주세요.\n', (money) => {
      this.game.setLotteCount(money);
    });
  }
}

const app = new App();
app.play();

module.exports = App;
