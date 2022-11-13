const Utils = require('./Utils');

const { Console, Random } = require('@woowacourse/mission-utils');
const { VALIDATE_TYPE } = require('./Validation');

const Lotto = require('./Lotto');
const HandleException = require('./HandleException');

const QUESTION_MESSAGE = {
    [VALIDATE_TYPE.CACHE]: '구입금액을 입력해 주세요.\n',
    [VALIDATE_TYPE.LOTTO]: '\n당첨 번호를 입력해 주세요.\n',
    [VALIDATE_TYPE.BONUS]: '\n보너스 번호를 입력해 주세요.\n',
};

class App {
    constructor() {
        this._userCache = null;
        this._userLotto = null;
        this._userBonus = null;
        this._userLotteryList = null;

        this._callbackHandler = null;
    }

    /* #region Class Member getter/setter */
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

    getUserLotto() {
        return this._userLotto;
    }

    setUserLotto(userLotto) {
        if (typeof userLotto === 'string') {
            this._userLotto = Utils.convertToNumberArray(userLotto);
            return;
        }

        this._userLotto = userLotto;
    }

    getUserLotteryList() {
        return this._userLotteryList;
    }

    setUserLotteryList(userLottryList) {
        this._userLotteryList = userLottryList;
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

    setCallbackHandler(...callbackList) {
        this._callbackHandler = this.makeCallbackHandler(...callbackList);
    }

    getCallbackHandler() {
        return this._callbackHandler;
    }

    *makeCallbackHandler(...callbackList) {
        for (let index = 0; index < callbackList.length; index++) {
            yield callbackList[index];
        }
    }
    /* #endregion */

    play() {
        const CALLBACK_LIST = [
            {
                callbackName: VALIDATE_TYPE.CACHE,
                extraCallback: () => {
                    this.buyLotteryTickets();
                    this.printLotteryList();
                },
            },
            {
                callbackName: VALIDATE_TYPE.LOTTO,
                extraCallback: null,
                extraOptions: {
                    // isInWinningNumber: this.isInWinningNumber(bonusNumber),
                    isInWinningNumber: false,
                },
            },
            {
                callbackName: VALIDATE_TYPE.BONUS,
                extraCallback: () => {
                    this.printWinningResult();
                    this.printRateOfReturn();
                },
            },
        ];

        this.loopCallback(...CALLBACK_LIST);
    }

    loopCallback(...callbackList) {
        const hasNoCallbackHandler = this.getCallbackHandler() === null;
        if (hasNoCallbackHandler) {
            this.setCallbackHandler(...callbackList);
        }

        const callbackHandler = this.getCallbackHandler();

        let callbackResult = callbackHandler.next();
        if (callbackResult.done) {
            Console.close();
            return;
        }

        let { callbackName: questionType, extraCallback, extraOptions } = callbackResult.value;

        Console.readLine(QUESTION_MESSAGE[questionType], (inputedValue) => {
            const handleException = new HandleException();
            handleException.tryValidate(inputedValue, questionType, extraOptions || null);

            this[`setUser${questionType}`](inputedValue);

            if (extraCallback) {
                extraCallback = extraCallback.bind(this);
                extraCallback();
            }

            this.loopCallback(...callbackList);
        });
    }

    /* #region Extra callback functions */
    /* #region  1. 로또 구입 금액 입력 */
    // No Needed extra callback function
    /* #endregion */

    /* #region  2. 구입한 로또 수량 및 번호 출력 */
    buyLotteryTickets() {
        const userCache = this.getUserCache();
        const lotteryCount = userCache / 1000;

        let lotteryArray = [];
        for (let i = 0; i < lotteryCount; i++) {
            const lotteryNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
            const sortedLotteryNumbers = lotteryNumbers.sort((a, b) => a - b);
            const newLotto = new Lotto(sortedLotteryNumbers);

            lotteryArray.push(newLotto);
        }

        this.setUserLotteryList(lotteryArray);
    }

    printLotteryList() {
        const userLotteryList = this.getUserLotteryList();
        const lotteryCount = userLotteryList.length;

        Console.print(`\n${lotteryCount}개를 구매했습니다.`);
        userLotteryList.forEach((userLottery) => {
            userLottery.printLotto();
        });
    }
    /* #endregion */

    /* #region  3. 당첨 번호 입력 */
    // No Needed extra callback function
    /* #endregion */

    /* #region  4. 보너스 번호 입력 */
    isInWinningNumber(bonusNumber) {
        const winningNumber = this.getWinningNumber();
        const userBonusNumber = Utils.convertToNumber(bonusNumber);
        return winningNumber.includes(userBonusNumber);
    }
    /* #endregion */

    /* #region  5. 당첨 내역 출력 */
    printWinningResult() {
        Console.print('\n당첨 통계');
        Console.print('---');

        const winningResult = this.getWinningResult();
        const outputMessage =
            `3개 일치 (5,000원) - ${winningResult['3개'] || 0}개\n` +
            `4개 일치 (50,000원) - ${winningResult['4개'] || 0}개\n` +
            `5개 일치 (1,500,000원) - ${winningResult['5개'] || 0}개\n` +
            `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningResult['bonus'] || 0}개\n` +
            `6개 일치 (2,000,000,000원) - ${winningResult['6개'] || 0}개`;

        Console.print(outputMessage);
    }

    getWinningResult() {
        const matchResults = this.compareNumbers();
        const winningResults = this.countWinningResult(matchResults);

        return winningResults;
    }

    compareNumbers() {
        const userLotto = this.getUserLotto();
        const userLotteryList = this.getUserLotteryList();

        const matchCountList = userLotteryList.map((lotteryNumber) => {
            return lotteryNumber.compareLotto(userLotto);
        });

        return matchCountList;
    }

    countWinningResult(matchResults) {
        const userLotteryList = this.getUserLotteryList();
        const userBonus = this.getUserBonus();
        let winningResults = {};

        matchResults.forEach((matchCount, index) => {
            if (matchCount !== 5) {
                winningResults[`${matchCount}개`] = (winningResults[`${matchCount}개`] || 0) + 1;
                return false;
            }

            const matchLottery = userLotteryList[index];
            const hasUserBonus = matchLottery.includes(userBonus);
            if (hasUserBonus) {
                winningResults['bonus'] = (winningResults['bonus'] || 0) + 1;
            } else {
                winningResults['5개'] = (winningResults['5개'] || 0) + 1;
            }
        });

        return winningResults;
    }
    /* #endregion */

    /* #region  6. 수익률 출력 */
    printRateOfReturn() {
        const rateOfReturn = this.calculateRateOfReturn();
        Console.print(`총 수익률은 ${rateOfReturn}%입니다.`);
    }

    calculateRateOfReturn() {
        const userCache = this.getUserCache();
        const winningResult = this.getWinningResult();
        const winningPrize =
            (winningResult['3개'] || 0) * 5000 +
            (winningResult['4개'] || 0) * 50000 +
            (winningResult['5개'] || 0) * 1500000 +
            (winningResult['bonus'] || 0) * 30000000 +
            (winningResult['6개'] || 0) * 2000000000;

        return ((winningPrize / userCache) * 100).toFixed(1);
    }
    /* #endregion */
    /* #endregion */
}

new App().play();

module.exports = App;
