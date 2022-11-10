const { Console, Random } = require('@woowacourse/mission-utils');

class App {
    constructor() {
        this._userCache = null;
        this.inputUserCache = this.inputUserCache.bind(this);
    }

    getUserCache() {
        return this._userCache();
    }

    setUserCache(userCache) {
        this._userCache = userCache;
    }

}

module.exports = App;
