const IOView = require("../Views/IOView");

const Lotto = require("../Models/Lotto");
const UserCache = require("../Models/UserCache");
const UserLottos = require("../Models/UserLottos");
const WinningLotto = require("../Models/WinningLotto");
const MatchResult = require("../Models/MatchResult");

const ExceptionHandler = require("../Lib/ExceptionHandler");
const { convertToNumber, convertToNumberArray } = require("../Lib/Utils");

const LottoController = {
  start() {
    LottoController.questionUserCache();
  },

  questionUserCache() {
    IOView.InputView.readUserCache(LottoController.userCacheCallback);
  },

  userCacheCallback(inputedValue) {
    const validateResult = ExceptionHandler.validateUserCache(inputedValue);
    if (!validateResult) {
      LottoController.questionUserCache();
      return;
    }

    IOView.OutputView.addNewLine();

    const convertedValue = convertToNumber(inputedValue);
    UserCache.setCache(convertedValue);
    LottoController.createUserLottos();
  },

  createUserLottos() {
    const userLottoCount = UserCache.getCount();
    const userLottos = Array(userLottoCount)
      .fill()
      .map((_) => new Lotto(Lotto.createRandomLotto()));

    UserLottos.setUserLottos(userLottos);
    LottoController.printUserLottoInfo();
  },

  printUserLottoInfo() {
    const userLottoCount = UserCache.getCount();
    const userLottos = UserLottos.getUserLottos();
    IOView.OutputView.printUserLottoInfo(userLottoCount, userLottos);

    LottoController.questionWinningNumbers();
  },

  questionWinningNumbers() {
    IOView.InputView.readWinningNumbers(LottoController.winningNumberCallback);
  },

  winningNumberCallback(inputedValue) {
    const validateResult =
      ExceptionHandler.validateWinningNumbers(inputedValue);
    if (!validateResult) {
      LottoController.questionWinningNumbers();
      return;
    }

    IOView.OutputView.addNewLine();

    const convertedValue = convertToNumberArray(inputedValue);
    WinningLotto.setWinningNumbers(convertedValue);

    LottoController.questionBonusNumber();
  },

  questionBonusNumber() {
    IOView.InputView.readBonusNumber(LottoController.bonusNumberCallback);
  },

  bonusNumberCallback(inputedValue) {
    const validateResult = ExceptionHandler.validateBonusNumber(inputedValue);
    if (!validateResult) {
      LottoController.questionBonusNumber();
      return;
    }

    IOView.OutputView.addNewLine();

    const convertedValue = convertToNumber(inputedValue);
    WinningLotto.setBonusNumber(convertedValue);
    LottoController.createWinningLotto();
  },

  createWinningLotto() {
    WinningLotto.createWinningLotto();
    LottoController.makeStatistics();
  },

  makeStatistics() {
    const userLottos = UserLottos.getUserLottos();
    const winningLotto = WinningLotto.getWinningLotto();

    MatchResult.makeMatchResult(userLottos, winningLotto);
    LottoController.printMatchResult();
  },

  printMatchResult() {
    const resultObject = MatchResult.getMatchResult();

    IOView.OutputView.printMatchResult(resultObject);
    LottoController.endService();
  },

  endService() {
    IOView.close();
  },
};

module.exports = LottoController;
