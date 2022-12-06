const MissionUtils = require("@woowacourse/mission-utils");

const LottoMachine = {
  lottoNumber() {
    const lottoNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    lottoNumber.sort();

    return lottoNumber;
  },
};

module.exports = LottoMachine;
