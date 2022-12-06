const Calculator = require("../util/Calculator");
const InputView = require("../view/InputView");
const LottoMachine = require("../util/LottoMachine");
const OutputView = require("../view/OutputView");

const Bonus = require("../model/Bonus");
const Lotto = require("../model/Lotto");
const Stastic = require("../model/Stastic");

class Controller {
  #purchaseAmount;
  #userLotto = [];
  #winningLotto;
  #bonus;

  startGame() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    InputView.inputPurchaseAmount(this.printPurchaseQuantity.bind(this));
  }

  printPurchaseQuantity(purchaseAmount) {
    const purchaseQuantity = Calculator.purchaseQuantity(purchaseAmount);
    OutputView.purchaseQuantity(purchaseQuantity);
    this.#purchaseAmount = purchaseAmount;

    this.printUserLotto(purchaseQuantity);
  }

  printUserLotto(purchaseQuantity) {
    //여기서 for문을 쓰는게 맞는지...
    for (let i = 0; i < purchaseQuantity; i++) {
      const lottoNumber = LottoMachine.lottoNumber();
      this.#userLotto.push(lottoNumber);

      OutputView.lottoNumber(lottoNumber);
    }

    this.inputWinningLotto();
  }

  inputWinningLotto() {
    InputView.inputWinningLotto(this.checkWinningLotto.bind(this));
  }

  checkWinningLotto(numbers) {
    new Lotto(numbers);
    this.#winningLotto = numbers;

    this.inputBonusNumber();
  }

  inputBonusNumber() {
    InputView.inputBonusNumber(this.checkBonusNumber.bind(this));
  }

  checkBonusNumber(number) {
    new Bonus(number);
    this.#bonus = number;

    this.getStastic();
  }

  getStastic() {
    const stastic = new Stastic();

    const arr = stastic.getCoincidence(
      this.#userLotto,
      this.#winningLotto,
      this.#bonus
    );

    this.printStastic(arr);
  }

  printStastic(arr) {
    OutputView.stastic(arr, 0);
  }
}

const controller = new Controller();
controller.startGame();

module.exports = Controller;
