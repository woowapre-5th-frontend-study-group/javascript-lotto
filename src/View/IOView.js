const InputView = require('./InputView');
const OutputView = require('./OutputView');
const { Console } = require('@woowacourse/mission-utils');
const { ERROR_HEADING } = require('../libs/const');

const IOView = {
  InputView,
  OutputView,

  Quit: {
    application() {
      Console.close();
    },

    withErrorMessage(errorMsg) {
      Console.close();

      throw new Error(`${ERROR_HEADING} ${errorMsg}`);
    },
  },
};

module.exports = IOView;
