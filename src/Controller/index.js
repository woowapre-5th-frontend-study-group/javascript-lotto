const IOView = require("../Views/IOView");

const UserCacheController = require("./UserCacheController");
const WinningLottoController = require("./WinningLottoController");
const StatisticsController = require("./StatisticsController");

const ControllerHandler = {
  initializeHandler() {
    UserCacheController.subscribe(WinningLottoController.start);
    WinningLottoController.subscribe(StatisticsController.start);
    StatisticsController.subscribe(ControllerHandler.endService);
  },

  startService() {
    UserCacheController.start();
  },

  endService() {
    IOView.close();
  },
};

module.exports = ControllerHandler;
