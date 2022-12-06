/** IMPORT CONSTANTS */
const { LOTTO } = require('../Constants');

/** PRIVATE FIELD */
let _userCache = 0;

const UserCache = {
  setCache(userCache) {
    _userCache = userCache;
  },

  getCache() {
    return _userCache;
  },

  getCount() {
    return _userCache / LOTTO.CAHCE.BASE_UNIT;
  },
};

module.exports = UserCache;
