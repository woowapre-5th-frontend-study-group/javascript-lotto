const Utils = require('./Utils');

class UserModels {
    constructor() {
        this._userCache = null;
        this._userLottoList = null;
        this._userWinningLotto = null;
        this._userBonus = null;
    }

    getUserCache() {
        return this._userCache;
    }

    setUserCache(userCache) {
        if (typeof userCache !== 'number') {
            this._userCache = Utils.convertToNumber(userCache);
            return;
        }

        this._userCache = userCache;
    }

    getUserLottoList() {
        return this._useryLottoist;
    }

    setUserLottoList(userLottoList) {
        this._userLottoList = userLottoList;
    }

    getUserWinningLotto() {
        return this._userWinningLotto;
    }

    setUserWinningLotto(userWinningLotto) {
        if (typeof userWinningLotto === 'string') {
            this._userWinningLotto = Utils.convertToNumberArray(userWinningLotto);
            return;
        }

        this._userWinningLotto = userWinningLotto;
    }

    getUserBonus() {
        return this._userBonus;
    }

    setUserBonus(userBonus) {
        if (typeof userBonus !== 'number') {
            this._userBonus = Utils.convertToNumber(userBonus);
            return;
        }

        this._userBonus = userBonus;
    }
}

module.exports = UserModels;
