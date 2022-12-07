/** IMPORT VIEW */
const InputView = require('./InputView');
const OutputView = require('./OutputView');

/** IMPORT UTILS */
const { Console } = require('@woowacourse/mission-utils');

const IOView = {
  InputView,
  OutputView,

  close() {
    Console.close();
  },
};

module.exports = IOView;
