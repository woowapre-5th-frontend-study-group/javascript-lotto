let _userCache = 0;

const UserCache = {
  setCache(userCache) {
    _userCache = userCache;
  },

  getCache() {
    return _userCache;
  },

  getCount() {
    return _userCache / 1000;
  },
};

module.exports = UserCache;
