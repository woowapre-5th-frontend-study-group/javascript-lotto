const IOView = require("../Views/IOView");

const UserLottos = require("../Models/UserLottos");
const WinningLotto = require("../Models/WinningLotto");
const MatchResult = require("../Models/MatchResult");

let _changeListener = null;

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