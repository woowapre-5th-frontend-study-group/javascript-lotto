/** IMPORT CONSTANTS */
const { LOTTO } = require('../Constants');

/** 결과 도출을 위한 객체 */
const _resultObject = {};

const MatchResult = {
  makeMatchResult(userLottos, winningLotto, bonusNumber) {
    for (let userLotto of userLottos) {
      const compareResult = userLotto.compareLotto(winningLotto);

      if (compareResult === 5) {
        const hasBonusNumber = userLotto.includeNumber(bonusNumber);
        const newKeyName = `${compareResult}${hasBonusNumber ? '_bonus' : ''}`;

        _resultObject[newKeyName] = _resultObject[newKeyName] + 1 || 1;
        continue;
      }

      _resultObject[compareResult] = _resultObject[compareResult] + 1 || 1;
    }

    MatchResult.calcuateRateOfReturn(userLottos.length);
  },

  calcuateRateOfReturn(userLottoCount) {
    const { FIFTH, FOURTH, THIRD, SECOND, FIRST } = LOTTO.WINNING_PRICE;
    const { BASE_UNIT } = LOTTO.CAHCE;

    const allReturn =
      (_resultObject['3'] || 0) * FIFTH +
      (_resultObject['4'] || 0) * FOURTH +
      (_resultObject['5'] || 0) * THIRD +
      (_resultObject['5_bonus'] || 0) * SECOND +
      (_resultObject['6'] || 0) * FIRST;

    const rateOfReturn = (allReturn / (userLottoCount * BASE_UNIT)) * 100;
    const formatString = rateOfReturn.toLocaleString(undefined, {
      minimumFractionDigits: 1,
    });

    _resultObject['RateOfReturn'] = formatString;
  },

  getMatchResult() {
    return _resultObject;
  },
};

module.exports = MatchResult;
