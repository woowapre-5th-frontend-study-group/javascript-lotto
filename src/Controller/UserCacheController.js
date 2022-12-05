const IOView = require("../Views/IOView");

const Lotto = require("../Models/Lotto");
const UserCache = require("../Models/UserCache");
const UserLottos = require("../Models/UserLottos");

const ExceptionHandler = require("../Lib/ExceptionHandler");
const { convertToNumber } = require("../Lib/Utils");

let _changeListener = null;

const UserCacheController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    UserCacheController.questionUserCache();
  },

  questionUserCache() {
    IOView.InputView.readUserCache(UserCacheController.userCacheCallback);
  },

  userCacheCallback(inputedValue) {
    const validateResult = ExceptionHandler.validateUserCache(inputedValue);
    if (!validateResult) {
      UserCacheController.questionUserCache();
      return;
    }

    IOView.OutputView.addNewLine();

    const convertedValue = convertToNumber(inputedValue);
    UserCache.setCache(convertedValue);
    UserCacheController.createUserLottos();
  },

  createUserLottos() {
    const userLottoCount = UserCache.getCount();
    const userLottos = Array(userLottoCount)
      .fill()
      .map((_) => new Lotto(Lotto.createRandomLotto()));

    UserLottos.setUserLottos(userLottos);
    UserCacheController.printUserLottoInfo();
  },

  printUserLottoInfo() {
    const userLottoCount = UserCache.getCount();
    const userLottos = UserLottos.getUserLottos();
    IOView.OutputView.printUserLottoInfo(userLottoCount, userLottos);

    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = UserCacheController;
