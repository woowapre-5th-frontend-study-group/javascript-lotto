const PurchasedLottos = require('./Model/PurchasedLottos');
const InputView = require('./View/InputView');
const OutputView = require('./View/OutputView');
const Validator = require('./libs/Validator');
const Quit = require('./libs/Quit');
const { MESSAGE, WINNING_NUMBER } = require('./libs/const');

class App {
  constructor() {
    this.lottos = null;
    this.winningNumbers = null;
    this.bonusNumber = null;
  }

  play() {
    this.requestMoney();
  }

  requestMoney() {
    InputView.readMoney((money) => {
      Validator.money(money);

      this.lottos = new PurchasedLottos(money);

      OutputView.printLottosCount(this.lottos.calculateCount());
      OutputView.printLottos(this.lottos.getLottos());

      this.requestWinningNumbers();
    });
  }

  requestWinningNumbers() {
    InputView.readWinningNumbers((winningNumbers) => {
      winningNumbers = winningNumbers.split(',').map((item) => Number(item));

      Validator.numbers(winningNumbers, WINNING_NUMBER);

      this.winningNumbers = winningNumbers;

      this.requestBonusNumber();
    });
  }

  requestBonusNumber() {
    InputView.readBonusNumber((bonusNumber) => {
      bonusNumber = Number(bonusNumber);

      Validator.bonusNumber(bonusNumber, this.winningNumbers);

      this.bonusNumber = bonusNumber;

      this.printWinningStats();
    });
  }

  printWinningStats() {
    OutputView.printMessage(MESSAGE.WINNING_STATS);

    const lottoRanks = this.lottos.getRanks(
      this.winningNumbers,
      this.bonusNumber
    );

    OutputView.printWinningDetails(this.lottos.getWinningDetails(lottoRanks));
    OutputView.printLottoRate(this.lottos.getLottoRate(lottoRanks));

    Quit.application();
  }
}

const app = new App();
app.play();

module.exports = App;
