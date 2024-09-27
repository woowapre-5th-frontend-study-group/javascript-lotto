const MissionUtils = require("@woowacourse/mission-utils");

const Bonus = require("./Bonus");
const Lotto = require("./Lotto");
const LottoMachine = require("./LottoMachine");
const Stastic = require("./Stastic");

const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");

class App {
  #lottoMachine;
  #winningLottoManager;
  #bonusNumberManager;
  #stasticManager;

  play() {
    this.readPurchaseAmount();
  }

  readPurchaseAmount() {
    InputView.readPurchaseAmount(this.printQuantity.bind(this));
  }

  printQuantity(money) {
    this.#lottoMachine = new LottoMachine(Number(money));
    const purchaseQuantity = this.#lottoMachine.getQuantity();

    OutputView.printEmptyLine();
    OutputView.printPurchaseQuantity(purchaseQuantity);
    this.printIssuedLottos(purchaseQuantity);
  }

  printIssuedLottos() {
    const issuedLottos = this.#lottoMachine.getIssuedLottos();

    OutputView.printIssuedLottos(issuedLottos);
    OutputView.printEmptyLine();

    this.readWinningLotto();
  }

  readWinningLotto() {
    InputView.readWinningLotto(this.validateWinningLotto.bind(this));
  }

  validateWinningLotto(numbers) {
    this.#winningLottoManager = new Lotto(numbers.split(",").map(Number));

    OutputView.printEmptyLine();

    this.readBonusNumber();
  }

  readBonusNumber() {
    InputView.readBonusNumber(this.validateBonusNumber.bind(this));
  }

  validateBonusNumber(number) {
    const winningLotto = this.#winningLottoManager.getWinningLotto();
    this.#bonusNumberManager = new Bonus(Number(number), winningLotto);

    OutputView.printEmptyLine();

    this.makeStastic();
  }

  makeStastic() {
    const winnerData = this.getWinnerData();
    const returnRate = this.getReturnRate();

    this.printStastic(winnerData, returnRate);
  }
  getWinnerData() {
    const issuedLottos = this.#lottoMachine.getIssuedLottos();
    const winningLotto = this.#winningLottoManager.getWinningLotto();
    const bonusNumber = this.#bonusNumberManager.getBonusNumber();
    this.#stasticManager = new Stastic(issuedLottos, winningLotto, bonusNumber);
    const winnerData = this.#stasticManager.getWinnerData();

    return winnerData;
  }
  getReturnRate() {
    const purchaseAmount = this.#lottoMachine.getPurchaseAmount();
    const returnRate = this.#stasticManager.getReturnRate(purchaseAmount);

    return returnRate;
  }

  printStastic(winnerData, returnRate) {
    OutputView.printStastic(winnerData, returnRate);

    this.quit();
  }

  quit() {
    MissionUtils.Console.close();
  }
}

const app = new App();
app.play();

module.exports = App;
