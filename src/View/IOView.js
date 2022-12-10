const InputView = require('./InputView');
const OutputView = require('./OutputView');
const errorHandler = require('../libs/errorHandler');
const { Console } = require('@woowacourse/mission-utils');

const IOView = {
  InputView,
  OutputView,

  Quit: {
    application() {
      Console.close();
    },

    withErrorMessage(errorMsg) {
      Console.close();

      errorHandler(errorMsg);
    },
  },
};

module.exports = IOView;
