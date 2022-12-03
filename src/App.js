const validation = require('./libs/validation');
const PlayerLottos = require('./models/PlayerLottos');
const InputView = require('./views/InputView');
const OutputView = require('./views/OutputView');

class App {
  #playerLottos;
  #winningNumbers;
  #bonusNumber;

  play() {
    this.requestMoney();
  }

  requestMoney() {
    InputView.readMoney((money) => this.handleReadMoney(money));
  }

  handleReadMoney(money) {
    validation.money(money);

    this.#playerLottos = new PlayerLottos(money);

    this.actionAboutRequestMoney();
  }

  actionAboutRequestMoney() {
    OutputView.printPurchasedLottos(
      this.#playerLottos.getCount(),
      this.#playerLottos.getLottosNumbers()
    );

    this.requestWinningNumbers();
  }

  requestWinningNumbers() {
    InputView.readWinningNumbers((winningNumbers) =>
      this.handleWinningNumbers(winningNumbers)
    );
  }

  handleWinningNumbers(winningNumbers) {
    winningNumbers = winningNumbers.split(',');
    validation.winningNumbers(winningNumbers);

    this.#winningNumbers = winningNumbers;

    this.requestBonusNumber();
  }

  requestBonusNumber() {
    InputView.readBonusNumber((bonusNumber) =>
      this.handleBonusNumber(bonusNumber)
    );
  }

  handleBonusNumber(bonusNumber) {
    validation.winningNumbers(this.#winningNumbers, bonusNumber);

    this.#bonusNumber = bonusNumber;

    this.printPurchasedLottosResult();
  }

  printPurchasedLottosResult() {
    const lottoResult = this.#playerLottos.getResult(
      this.#winningNumbers,
      this.#bonusNumber
    );

    OutputView.printReuslt(lottoResult, this.#playerLottos.getCount());
  }
}

const app = new App();
app.play();

module.exports = App;
