/** IMPORT VIEW */
const IOView = require('../Views/IOView');

/** IMPORT MODELS */
const UserLottos = require('../Models/UserLottos');
const WinningLotto = require('../Models/WinningLotto');
const MatchResult = require('../Models/MatchResult');

/** PUBLISH를 위한 LISTENER */
let _changeListener = null;

/** 통계를 관리하는 컨트롤러 */
const StatisticsController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    StatisticsController.makeStatistics();
  },

  makeStatistics() {
    const userLottos = UserLottos.getUserLottos();
    const winningLotto = WinningLotto.getWinningLotto();

    MatchResult.makeMatchResult(userLottos, winningLotto);
    StatisticsController.printMatchResult();
  },

  printMatchResult() {
    const resultObject = MatchResult.getMatchResult();

    IOView.OutputView.printMatchResult(resultObject);

    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = StatisticsController;
