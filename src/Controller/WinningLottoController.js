const IOView = require("../Views/IOView");

const WinningLotto = require("../Models/WinningLotto");

const ExceptionHandler = require("../Lib/ExceptionHandler");
const { convertToNumber, convertToNumberArray } = require("../Lib/Utils");

let _changeListener = null;

const WinningLottoController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    WinningLottoController.questionWinningNumbers();
  },

  questionWinningNumbers() {
    IOView.InputView.readWinningNumbers(
      WinningLottoController.winningNumberCallback
    );
  },

  winningNumberCallback(inputedValue) {
    const validateResult =
      ExceptionHandler.validateWinningNumbers(inputedValue);
    if (!validateResult) {
      WinningLottoController.questionWinningNumbers();
      return;
    }

    IOView.OutputView.addNewLine();

    const convertedValue = convertToNumberArray(inputedValue);
    WinningLotto.setWinningNumbers(convertedValue);

    WinningLottoController.questionBonusNumber();
  },

  questionBonusNumber() {
    IOView.InputView.readBonusNumber(
      WinningLottoController.bonusNumberCallback
    );
  },

  bonusNumberCallback(inputedValue) {
    const validateResult = ExceptionHandler.validateBonusNumber(inputedValue);
    if (!validateResult) {
      WinningLottoController.questionBonusNumber();
      return;
    }

    IOView.OutputView.addNewLine();

    const convertedValue = convertToNumber(inputedValue);
    WinningLotto.setBonusNumber(convertedValue);
    WinningLottoController.createWinningLotto();
  },

  createWinningLotto() {
    WinningLotto.createWinningLotto();

    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = WinningLottoController;
