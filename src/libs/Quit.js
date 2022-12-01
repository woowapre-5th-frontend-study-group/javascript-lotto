const { Console } = require('@woowacourse/mission-utils');
const { ERROR_HEADING } = require('./const');

const Quit = {
  application() {
    Console.close();
  },

  withErrorMessage(errorMsg) {
    Console.close();

    throw new Error(`${ERROR_HEADING} ${errorMsg}`);
  },
};

module.exports = Quit;
