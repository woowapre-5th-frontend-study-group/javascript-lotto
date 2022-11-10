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
      this.game.setLottoCount(money);

      this.game.printLottoCount();

      this.game.printLottoList();
    });
  }
}

const app = new App();
app.play();

module.exports = App;
