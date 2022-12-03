const _resultObject = {};

const MatchResult = {
  makeMatchResult(userLottos, winningLotto, bonusNumber) {
    for (let userLotto of userLottos) {
      const compareResult = userLotto.compareLotto(winningLotto);

      if (compareResult === 5) {
        const hasBonusNumber = userLotto.includeNumber(bonusNumber);
        const newKeyName = `${compareResult}${hasBonusNumber ? "_bonus" : ""}`;

        _resultObject[newKeyName] = _resultObject[newKeyName] + 1 || 1;
        continue;
      }

      _resultObject[compareResult] = _resultObject[compareResult] + 1 || 1;
    }

    MatchResult.calcuateRateOfReturn(userLottos.length);
  },

  calcuateRateOfReturn(userLottoCount) {
    const allReturn =
      (_resultObject["3"] || 0) * 5_000 +
      (_resultObject["4"] || 0) * 50_000 +
      (_resultObject["5"] || 0) * 1_500_000 +
      (_resultObject["5_bonus"] || 0) * 30_000_000 +
      (_resultObject["6"] || 0) * 2_000_000_000;

    const rateOfReturn = (allReturn / (userLottoCount * 1_000)) * 100;
    const formatString = rateOfReturn.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

    _resultObject["RateOfReturn"] = formatString;
  },

  getMatchResult() {
    return _resultObject;
  },
};

module.exports = MatchResult;
