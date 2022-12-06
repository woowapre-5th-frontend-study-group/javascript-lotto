const MissionUtils = require("@woowacourse/mission-utils");

const Message = require("../constant/Message");

const InputView = {
  inputPrice(fn) {
    MissionUtils.Console.readLine(Message.inputPrice, (price) => fn(price));
  },
};

module.exports = InputView;
