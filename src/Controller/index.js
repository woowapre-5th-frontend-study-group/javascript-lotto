/** IMPORT VIEW */
const IOView = require('../Views/IOView');

/** IMPORT CONTROLLER */
const UserCacheController = require('./UserCacheController');
const WinningLottoController = require('./WinningLottoController');
const StatisticsController = require('./StatisticsController');

/** 컨트롤러를 관리하는 핸들러 */
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
