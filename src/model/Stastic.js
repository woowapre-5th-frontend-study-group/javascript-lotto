class Stastic {
  #coincidence = [0, 0, 0, 0, 0];

  getCoincidence(userLotto, winningLotto, bonus) {
    userLotto.map((numbers) => {
      let coincidenceQuantity = this.checkCoincidence(numbers, winningLotto);
      let bonusCoincidence = this.getBonusCoincidence(numbers, bonus);

      this.setArray(coincidenceQuantity, bonusCoincidence);
    });

    return this.#coincidence.bind(this);
  }

  checkCoincidence(numbers, winningLotto) {
    let set = new Set(numbers.push(winningLotto));
    set = [...set];

    return 12 - set.length;
  }

  getBonusCoincidence(numbers, bonus) {
    if (numbers.Includes(bonus)) {
      return true;
    }
    return false;
  }

  setArray(coincidenceQuantity, bonusCoincidence) {
    if (coincidenceQuantity === 3) {
      this.#coincidence[0] += 1;
    }
    if (coincidenceQuantity === 4) {
      this.#coincidence[1] += 1;
    }
    if (coincidenceQuantity === 5) {
      !bonusCoincidence
        ? (this.#coincidence[2] += 1)
        : (this.#coincidence[3] += 1);
    }
    if (coincidenceQuantity === 6) {
      this.#coincidence[4] += 1;
    }
  }
}

module.exports = Stastic;
