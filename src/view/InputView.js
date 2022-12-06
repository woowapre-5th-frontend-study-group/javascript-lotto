const MissionUtils = require("@woowacourse/mission-utils");

const Message = require("../constant/Message");

const InputView = {
  inputPurchaseAmount(fn) {
    MissionUtils.Console.readLine(Message.inputPurchaseAmount, (price) =>
      fn(price)
    );
  },
};

module.exports = InputView;
