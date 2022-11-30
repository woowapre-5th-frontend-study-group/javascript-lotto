const { Console } = require('@woowacourse/mission-utils');

const Quit = {
  application() {
    Console.close();
  },

  withErrorMessage(errorMsg) {
    Console.close();

    throw new Error(errorMsg);
  },
};

module.exports = Quit;
