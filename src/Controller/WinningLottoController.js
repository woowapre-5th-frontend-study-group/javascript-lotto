/** IMPORT VIEW */
const IOView = require('../Views/IOView');

/** IMPORT MODELS */
const WinningLotto = require('../Models/WinningLotto');

/** IMPORT UTILS */
const ExceptionHandler = require('../Lib/ExceptionHandler');
const { convertToNumber, convertToNumberArray } = require('../Lib/Utils');

/** PUBLISH를 위한 LISTENER */
let _changeListener = null;

/** 당첨 로또(당첨 번호, 보너스 번호)를 관리하는 컨트롤러 */
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
    const winningNumbers = WinningLotto.getWinningNumbers();
    const validateResult = ExceptionHandler.validateBonusNumber(
      winningNumbers,
      inputedValue
    );

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
