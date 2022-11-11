const { Console } = require("@woowacourse/mission-utils");
const UserLotto = require("./UserLotto");

class App {
  userLotto;
  play() {
    Console.print("구입금액을 입력해 주세요.");
    Console.readLine("", (purchaseAmout) => {
      const userLotto = new UserLotto(purchaseAmout);
      this.userLotto = userLotto;
      this.printLottoCountNumbersMessage();
    });
  }

  printLottoCountNumbersMessage() {
    Console.print(`${this.userLotto.count}개를 구매했습니다.`);
    this.userLotto.numbers.forEach((number) => {
      Console.print(number);
    });
  }
}

const app = new App();
app.play();

module.exports = App;
