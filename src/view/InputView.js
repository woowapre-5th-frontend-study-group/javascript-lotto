const MissionUtils = require("@woowacourse/mission-utils");

const Message = require("../constant/Message");

const InputView = {
  inputPurchaseAmout(fn) {
    MissionUtils.Console.readLine(Message.inputPurchaseAmout, (price) =>
      fn(price)
    );
  },
};

module.exports = InputView;
