/** IMPORT VIEW */
const IOView = require('../Views/IOView');

/** IMPORT MODELS */
const Lotto = require('../Models/Lotto');
const UserCache = require('../Models/UserCache');
const UserLottos = require('../Models/UserLottos');

/** IMPORT UTILS */
const ExceptionHandler = require('../Lib/ExceptionHandler');
const { convertToNumber } = require('../Lib/Utils');

/** PUBLISH를 위한 LISTENER */
let _changeListener = null;

/** 금액을 관리하는 컨트롤러 */
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
