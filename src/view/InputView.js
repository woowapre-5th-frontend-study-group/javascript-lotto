const { Console } = require("@woowacourse/mission-utils");

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(makeBridge) {
    Console.readLine(INPUT_MESSAGE.BRIDGE_SIZE, (bridgeSize) => {
      try {
        Validation.bridgeSize(Number(bridgeSize)); // Number(bridgeSize) 변수 만들고 싶은데 10라인제한 😭
        makeBridge(Number(bridgeSize));
      } catch {
        this.readBridgeSize(makeBridge);
      }
    });
  },
};

module.exports = InputView;
