class Stastic {
  #winnerData = {
    firstPlace: 0,
    secondPlace: 0,
    thirdPlace: 0,
    fourthPlace: 0,
    fifthPlace: 0,
  };

  constructor(issuedLottos, winningLotto, bonusNumber) {
    this.matchData = this.getMatchData(issuedLottos, winningLotto, bonusNumber);
  }

  getWinnerData() {
    return this.#winnerData;
  }

  getMatchData(issuedLottos, winningLotto, bonusNumber) {
    issuedLottos.forEach((issuedLotto) => {
      let winningLottoMatchCount = this.getMatchCount(
        issuedLotto,
        winningLotto
      );
      let BonusNumberMatchCount = this.getMatchCount(issuedLotto, bonusNumber);

      this.checkWinner(winningLottoMatchCount, BonusNumberMatchCount);
    });
  }

  getMatchCount(issuedLotto, target) {
    const combination = issuedLotto.concat(target);
    let set = new Set(combination);
    set = [...set];
    const matchCount = combination.length - set.length;

    return matchCount;
  }

  checkWinner(winningLottoMatchCount, BonusNumberMatchCount) {
    if (winningLottoMatchCount === 3) {
      this.#winnerData.fifthPlace += 1;
    }
    if (winningLottoMatchCount === 4) {
      this.#winnerData.fourthPlace += 1;
    }
    if (winningLottoMatchCount === 5 && !BonusNumberMatchCount) {
      this.#winnerData.thirdPlace += 1;
    }
    if (winningLottoMatchCount === 5 && BonusNumberMatchCount) {
      this.#winnerData.secondPlace += 1;
    }
    if (winningLottoMatchCount === 6) {
      this.#winnerData.firstPlace += 1;
    }
  }

  getReturnRate(money) {
    const sum =
      this.#winnerData.firstPlace * 2000000000 +
      this.#winnerData.secondPlace * 30000000 +
      this.#winnerData.thirdPlace * 1500000 +
      this.#winnerData.fourthPlace * 50000 +
      this.#winnerData.fifthPlace * 5000;

    const returnRate = (sum / money) * 100;

    return returnRate.toFixed(1);
  }
}

module.exports = Stastic;
