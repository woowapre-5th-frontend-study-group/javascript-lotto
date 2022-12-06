const MissionUtils = require("@woowacourse/mission-utils");

const Message = require("../constant/Message");

const InputView = {
  inputPurchaseAmount(fn) {
    MissionUtils.Console.readLine(Message.inputPurchaseAmount, (price) =>
      fn(price)
    );
  },

  inputWinningLotto(fn) {
    MissionUtils.Console.readLine(Message.inputWinningLotto, (string) =>
      fn(string.split(",").map(Number))
    );
  },

  inputBonusNumber(fn) {
    MissionUtils.Console.readLine(Message.inputBonusNumber, (string) =>
      fn(Number(string))
    );
  },
};

module.exports = InputView;
