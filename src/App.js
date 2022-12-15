const Bonus = require("./Bonus");
const Lotto = require("./Lotto");
const LottoMachine = require("./LottoMachine");

const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");

class App {
  #lottoMachine;
  #winningLottoManager;
  #bonusNumberManager;

  play() {
    this.readPurchaseAmount();
  }

  readPurchaseAmount() {
    InputView.readPurchaseAmount(this.printQuantity.bind(this));
  }

  printQuantity(money) {
    this.#lottoMachine = new LottoMachine(Number(money));
    const purchaseQuantity = this.#lottoMachine.quantity;

    OutputView.printEmptyLine();
    OutputView.printPurchaseQuantity(purchaseQuantity);
    this.printIssuedLottos(purchaseQuantity);
  }

  printIssuedLottos() {
    const issuedLottos = this.#lottoMachine.makeLottos();

    OutputView.printIssuedLottos(issuedLottos);
    OutputView.printEmptyLine();

    this.readWinningLotto();
  }

  readWinningLotto() {
    InputView.readWinningLotto(this.validateWinningLotto.bind(this));
  }

  validateWinningLotto(numbers) {
    this.#winningLottoManager = new Lotto(numbers.split(","));

    OutputView.printEmptyLine();

    this.readBonusNumber();
  }

  readBonusNumber() {
    InputView.readBonusNumber(this.validateBonusNumber.bind(this));
  }

  validateBonusNumber(number) {
    this.#bonusNumberManager = new Bonus(number);
  }
}

const app = new App();
app.play();

module.exports = App;
