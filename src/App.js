const { Console, Random } = require('@woowacourse/mission-utils');
const { VALIDATE_TYPE } = require('./Validation');

const Utils = require('./Utils');

const Lotto = require('./Lotto');
const HandleException = require('./HandleException');

class App {
    constructor() {
        this._userCache = null;
        this._winningNumber = null;
        this._userLotteryList = null;
        this._bonusNumber = null;

        this.inputUserCache = this.inputUserCache.bind(this);
        this.inputWinningNumber = this.inputWinningNumber.bind(this);
        this.inputBonusNumber = this.inputBonusNumber.bind(this);
    }

    /* #region Class Member getter/setter */
    getUserCache() {
        return this._userCache;
    }

    setUserCache(userCache) {
        this._userCache = userCache;
    }

    getWinningNumber() {
        return this._winningNumber;
    }

    setWinningNumber(winningNumber) {
        this._winningNumber = winningNumber;
    }

    getUserLotteryList() {
        return this._userLotteryList;
    }

    setUserLotteryList(userLottryList) {
        this._userLotteryList = userLottryList;
    }

    getBonusNumber() {
        return this._bonusNumber;
    }

    setBonusNumber(bonusNumber) {
        this._bonusNumber = bonusNumber;
    }
    /* #endregion */

    play() {
        this.questionInputCache();
    }

    /* #region  1. 로또 구입 금액 입력 */
    questionInputCache() {
        Console.readLine('구입금액을 입력해 주세요.\n', this.inputUserCache);
    }

    inputUserCache(inputCache) {
        const handleException = new HandleException();
        handleException.tryValidate(inputCache, VALIDATE_TYPE.CACHE);

        const userCache = Utils.convertToNumber(inputCache);
        this.setUserCache(userCache);
        this.buyLotteryAndPrint();
    }
    /* #endregion */

    /* #region  2. 구입한 로또 수량 및 번호 출력 */
    buyLotteryAndPrint() {
        this.buyLotteryTickets();
        this.printLotteryList();
        this.questionWinningNumber();
    }

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
    questionWinningNumber() {
        Console.readLine('\n당첨 번호를 입력해 주세요.\n', this.inputWinningNumber);
    }

    inputWinningNumber(winningNumber) {
        const handleException = new HandleException();
        handleException.tryValidate(winningNumber, VALIDATE_TYPE.LOTTO);

        const userWinningNumber = Utils.convertToNumberArray(winningNumber);
        this.setWinningNumber(userWinningNumber);
        this.questionBonusNumber();
    }
    /* #endregion */

    /* #region  4. 보너스 번호 입력 */
    questionBonusNumber() {
        Console.readLine('\n보너스 번호를 입력해 주세요.\n', this.inputBonusNumber);
    }

    inputBonusNumber(bonusNumber) {
        const handleException = new HandleException();
        handleException.tryValidate(bonusNumber, VALIDATE_TYPE.BONUS, {
            isInWinningNumber: this.isInWinningNumber(bonusNumber),
        });

        const userBonusNumber = Utils.convertToNumber(bonusNumber);
        this.setBonusNumber(userBonusNumber);
        this.printWinningResult();
    }

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
        this.printRateOfReturn();
    }

    getWinningResult() {
        const matchResults = this.compareNumbers();
        const winningResults = this.countWinningResult(matchResults);

        return winningResults;
    }

    compareNumbers() {
        const winningNumber = this.getWinningNumber();
        const userLotteryList = this.getUserLotteryList();

        const matchCountList = userLotteryList.map((lotteryNumber) => {
            return lotteryNumber.compareLotto(winningNumber);
        });

        return matchCountList;
    }

    countWinningResult(matchResults) {
        const userLotteryList = this.getUserLotteryList();
        const bonusNumber = this.getBonusNumber();
        let winningResults = {};

        matchResults.forEach((matchCount, index) => {
            if (matchCount !== 5) {
                winningResults[`${matchCount}개`] = (winningResults[`${matchCount}개`] || 0) + 1;
                return false;
            }

            const matchLottery = userLotteryList[index];
            const hasBonusNumber = matchLottery.includes(bonusNumber);
            if (hasBonusNumber) {
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
        Console.close();
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
}


module.exports = App;
