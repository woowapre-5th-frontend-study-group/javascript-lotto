const Lotto = require("../Models/Lotto");

let _winningNumbers = [];
let _bonusNumber = null;
let _winningLotto = null;

const WinningLotto = {
  setWinningNumbers(winningNumbers) {
    _winningNumbers = winningNumbers;
  },

  getWinningNumbers() {
    return _winningNumbers;
  },

  setBonusNumber(bonusNumber) {
    _bonusNumber = bonusNumber;
  },

  getBonusNumber() {
    return _bonusNumber;
  },

  createWinningLotto() {
    _winningLotto = new Lotto(_winningNumbers);
  },

  getWinningLotto() {
    return _winningLotto;
  },
};

module.exports = WinningLotto;
