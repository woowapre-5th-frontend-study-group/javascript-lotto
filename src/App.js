const Lottos = require('./Lottos');
const WinningNumbers = require('./WinningNumbers');
const BonusNumber = require('./BonusNumber');
const InputView = require('./View/InputView');
const { Console } = require('@woowacourse/mission-utils');
const { MESSAGE } = require('./libs/const');
const OutputView = require('./View/OutputView');

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
      this.lottos = new Lottos(money);

      OutputView.printLottosCount(money);
      OutputView.printLottos(this.lottos.getLottos());

      this.requestWinningNumbers();
    });
  }

  requestWinningNumbers() {
    InputView.readWinningNumbers((winningNumbers) => {
      winningNumbers = winningNumbers.split(',').map((item) => Number(item));

      this.winningNumbers = new WinningNumbers(winningNumbers);

      this.requestBonusNumber();
    });
  }

  requestBonusNumber() {
    InputView.readBonusNumber((bonusNumber) => {
      bonusNumber = Number(bonusNumber);

      this.bonusNumber = new BonusNumber(
        bonusNumber,
        this.winningNumbers.value
      );

      this.printWinningStats();
    });
  }

  printWinningStats() {
    OutputView.printMessage(MESSAGE.WINNING_STATS);

    const lottoRanks = this.lottos.getRanks(
      this.winningNumbers.value,
      this.bonusNumber.value
    );

    OutputView.printWinningDetails(this.lottos.getWinningDetails(lottoRanks));
    OutputView.printLottoRate(this.lottos.getLottoRate(lottoRanks));

    this.end();
  }

  end() {
    Console.close();
  }
}

const app = new App();
app.play();

module.exports = App;
