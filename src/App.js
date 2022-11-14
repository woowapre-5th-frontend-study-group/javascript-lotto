const { Console } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const UserLotto = require("./UserLotto");

class App {
  userLotto;
  winningNumbers;

  play() {
    Console.print("구입금액을 입력해 주세요.");
    Console.readLine("", (purchaseAmout) => {
      const userLotto = new UserLotto(purchaseAmout);
      this.userLotto = userLotto;
      this.printLottoCountNumbersMessage();
      this.getWinningNumbers();
    });
  }

  printLottoCountNumbersMessage() {
    Console.print(`${this.userLotto.count}개를 구매했습니다.`);
    this.userLotto.numbers.forEach((number) => {
      Console.print(number);
    });
  }

  getWinningNumbers() {
    Console.print("당첨 번호를 입력해 주세요.");
    Console.readLine("", (winningNumbers) => {
      this.winningNumbers = new Lotto(winningNumbers.split(","));
      this.getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.print("보너스 번호를 입력해 주세요.");
    Console.readLine("", (bonusNumber) => {});
  }
}

const app = new App();
app.play();

module.exports = App;
