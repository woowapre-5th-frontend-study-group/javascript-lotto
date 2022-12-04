const PlayerLottos = require('./Model/PlayerLottos');
const Validator = require('./libs/Validator');
const { MESSAGE, WINNING_NUMBER } = require('./libs/const');
const { OutputView, InputView, Quit } = require('./View/IOView');

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
    money = Number(money);

    Validator.money(money);

    this.#playerLottos = new PlayerLottos(money);

    OutputView.printLottosCount(this.#playerLottos.calculateCount());
    OutputView.printLottos(this.#playerLottos.getLottos());

    this.requestWinningNumbers();
  }

  requestWinningNumbers() {
    InputView.readWinningNumbers((winningNumbers) =>
      this.handleWinningNumbers(winningNumbers)
    );
  }

  handleWinningNumbers(winningNumbers) {
    winningNumbers = winningNumbers.split(',').map((item) => Number(item));

    Validator.numbers(winningNumbers, WINNING_NUMBER);

    this.#winningNumbers = winningNumbers;

    this.requestBonusNumber();
  }

  requestBonusNumber() {
    InputView.readBonusNumber((bonusNumber) =>
      this.handleReadBonusNumber(bonusNumber)
    );
  }

  handleReadBonusNumber(bonusNumber) {
    bonusNumber = Number(bonusNumber);

    Validator.bonusNumber(bonusNumber, this.#winningNumbers);

    this.#bonusNumber = bonusNumber;

    this.printWinningStats();
  }

  printWinningStats() {
    OutputView.printMessage(MESSAGE.WINNING_STATS);

    const lottoRanks = this.#playerLottos.getRanks(
      this.#winningNumbers,
      this.#bonusNumber
    );

    OutputView.printWinningDetails(
      this.#playerLottos.getWinningDetails(lottoRanks)
    );
    OutputView.printLottoRate(this.#playerLottos.getLottoRate(lottoRanks));

    Quit.application();
  }
}

const app = new App();
app.play();

module.exports = App;
