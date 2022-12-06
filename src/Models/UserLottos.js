/** PRIVATE FIELD */
let _userLottos = [];

const UserLottos = {
  setUserLottos(lottoArray) {
    _userLottos = lottoArray;
  },

  getUserLottos() {
    return _userLottos;
  },
};

module.exports = UserLottos;
