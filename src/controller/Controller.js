const Calculator = require("../util/Calculator");
const InputView = require("../view/InputView");
const LottoMachine = require("../util/LottoMachine");
const OutputView = require("../view/OutputView");

const Bonus = require("../model/Bonus");
const Lotto = require("../model/Lotto");

class Controller {
  #lotto;
  startGame() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    InputView.inputPurchaseAmount(this.printPurchaseQuantity.bind(this));
  }

  printPurchaseQuantity(purchaseAmount) {
    const purchaseQuantity = Calculator.purchaseQuantity(purchaseAmount);
    OutputView.purchaseQuantity(purchaseQuantity);

    this.printUserLotto(purchaseQuantity);
  }

  printUserLotto(purchaseQuantity) {
    //여기서 for문을 쓰는게 맞는지...
    for (let i = 0; i < purchaseQuantity; i++) {
      const lottoNumber = LottoMachine.lottoNumber();
      OutputView.lottoNumber(lottoNumber);
    }

    this.inputWinningLotto();
  }

  inputWinningLotto() {
    InputView.inputWinningLotto(this.checkWinningLotto.bind(this));
  }

  checkWinningLotto(numbers) {
    new Lotto(numbers);

    this.inputBonusNumber();
  }

  inputBonusNumber() {
    InputView.inputBonusNumber(this.checkBonusNumber.bind(this));
  }

  checkBonusNumber(number) {
    new Bonus(number);
  }
}

const controller = new Controller();
controller.startGame();

module.exports = Controller;
