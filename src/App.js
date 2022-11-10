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

    play() {
        Console.readLine('구입금액을 입력해 주세요.\n', this.inputUserCache);
    }

    inputUserCache(inputCache) {
        const { isInvalidatedCache, errorObject } = this.invalidateCache(inputCache);
        if (isInvalidatedCache) {
            this.returnException(errorObject);
            return;
        }

        const userCache = this.convertToNumber(inputCache);
        this.setUserCache(userCache);
    }

    invalidateCache(inputCache) {
        const checkValidation = {
            isNotNumber: this.isNotNumber(inputCache),
            isUnderThousand: this.isUnder(inputCache, 1000),
            couldNotBeDevidedByThousand: this.couldNotBeDevidedBy(inputCache, 1000),
        };

        const errorType = {
            isNotNumber: new Error('[ERROR] 숫자 이외의 문자를 입력하였습니다.'),
            isUnderThousand: new Error('[ERROR] 금액이 부족하여 로또를 구매할 수 없습니다.'),
            couldNotBeDevidedByThousand: new Error('[ERROR] 1,000원 단위의 금액이 아닙니다.'),
            null: '',
        };

        const [matchError] = Object.entries(checkValidation).filter(([_, value]) => value);
        const [errorName, _] = matchError || [null, null];
        const validateResult = {
            isInvalidatedCache: !!errorName,
            errorObject: errorType[errorName],
        };

        return validateResult;
    }

    isNotNumber(source) {
        return isNaN(+source);
    }

    couldNotBeDevidedBy(number, operand) {
        return !!(+number % operand);
    }

    isUnder(number, threshold) {
        return +number < threshold;
    }

    returnException(errorObject) {
        Console.print(errorObject.message);
        throw errorObject;
    }

    convertToNumber(source) {
        return +source;
    }
    /* #region  2. 구입한 로또 수량 및 번호 출력 */
    buyLotteryAndPrint() {
        this.buyLotteryTickets();
        this.printLotteryList();
        this.questionWinningNumber();
    }

    generateLotteryNumbers() {
        let randomNumbers = [];
        while (randomNumbers.length < 6) {
            const number = Random.pickNumberInRange(1, 45);
            if (!randomNumbers.includes(number)) {
                randomNumbers.push(number);
            }
        }

        return randomNumbers;
    }

    buyLotteryTickets() {
        const userCache = this.getUserCache();
        const lotteryCount = userCache / 1000;

        let lotteryArray = [];
        for (let i = 0; i < lotteryCount; i++) {
            const lotteryNumbers = this.generateLotteryNumbers();
            const sortedLotteryNumbers = lotteryNumbers.sort((a, b) => a - b);
            lotteryArray.push(sortedLotteryNumbers);
        }

        this.setUserLotteryList(lotteryArray);
    }

    printLotteryList() {
        const userLotteryList = this.getUserLotteryList();
        const lotteryCount = userLotteryList.length;

        Console.print(`${lotteryCount}개를 구매했습니다.`);
        userLotteryList.forEach((lotteryArray) => {
            Console.print(lotteryArray);
        });
    }
    /* #endregion */

}


module.exports = App;
