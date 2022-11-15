const { Console, Random } = require('@woowacourse/mission-utils');
const Utils = require('./Utils');

const UserModels = require('./UserModels');

const Lotto = require('./Lotto');
const Validation = require('./Validation');
const HandleException = require('./HandleException');

const VALIDATE_TYPE = Validation.VALIDATE_TYPE;

const QUESTION_MESSAGE = {
    [VALIDATE_TYPE.CACHE]: '구입금액을 입력해 주세요.\n',
    [VALIDATE_TYPE.LOTTO]: '\n당첨 번호를 입력해 주세요.\n',
    [VALIDATE_TYPE.BONUS]: '\n보너스 번호를 입력해 주세요.\n',
};

const handleException = new HandleException();
const userModels = new UserModels();

class App {
    constructor() {
        this._callbackHandler = null;
    }

    /* #region Class Member getter/setter */
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
        const callbackList = [
            {
                callbackName: VALIDATE_TYPE.CACHE,
                extraCallback: () => {
                    this.buyLottoTickets();
                    this.printLottoList();
                },
            },
            {
                callbackName: VALIDATE_TYPE.LOTTO,
                extraCallback: null,
            },
            {
                callbackName: VALIDATE_TYPE.BONUS,
                extraCallback: () => {
                    this.printWinningResult();
                    this.printRateOfReturn();
                },
            },
        ];

        this.setCallbackHandler(...callbackList);
        this.loopCallback();
    }

    loopCallback() {
        const nextCallback = this.getNextCallback();
        if (!nextCallback) {
            Console.close();
            return;
        }

        let { callbackName: questionType, extraCallback } = nextCallback;

        Console.readLine(QUESTION_MESSAGE[questionType], (inputedValue) => {
            handleException.tryValidate(inputedValue, questionType);

            const convertedValue = this.convertToEachType(inputedValue, questionType);
            userModels[`setUser${questionType}`](convertedValue);

            if (extraCallback) {
                extraCallback = extraCallback.bind(this);
                extraCallback();
            }

            this.loopCallback();
        });
    }

    getNextCallback() {
        const callbackHandler = this.getCallbackHandler();

        let callbackResult = callbackHandler.next();
        if (callbackResult.done) {
            return null;
        }

        return callbackResult.value;
    }

    convertToEachType(value, type) {
        switch (type) {
            case VALIDATE_TYPE.CACHE:
                return Utils.convertToNumber(value);

            case VALIDATE_TYPE.LOTTO:
                return new Lotto(value);

            case VALIDATE_TYPE.BONUS:
                return Utils.convertToNumber(value);
        }
    }

    /* #region Extra callback functions */
    /* #region  1. 로또 구입 금액 입력 */
    // No Needed extra callback function
    /* #endregion */

    /* #region  2. 구입한 로또 수량 및 번호 출력 */
    buyLottoTickets() {
        const userCache = userModels.getUserCache();
        const lottoCount = userCache / 1000;

        let lottoArray = [];
        for (let i = 0; i < lottoCount; i++) {
            const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
            const sortedLottoNumbers = lottoNumbers.sort((a, b) => a - b);
            const newLotto = new Lotto(sortedLottoNumbers);

            lottoArray.push(newLotto);
        }

        userModels.setUserLottoList(lottoArray);
    }

    printLottoList() {
        const userLottoList = userModels.getUserLottoList();
        const lottoCount = userLottoList.length;

        Console.print(`\n${lottoCount}개를 구매했습니다.`);
        userLottoList.forEach((userLotto) => {
            userLotto.printLotto();
        });
    }
    /* #endregion */

    /* #region  3. 당첨 번호 입력 */
    // No Needed extra callback function
    /* #endregion */

    /* #region  4. 보너스 번호 입력 */
    // No Needed extra callback function
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
        const matchResults = this.compareLottos();
        const winningResults = this.countWinningResult(matchResults);

        return winningResults;
    }

    compareLottos() {
        const userWinningLotto = userModels.getUserWinningLotto();
        const userLottoList = userModels.getUserLottoList();

        const matchCountList = userLottoList.map((userLotto) => {
            return userLotto.compareLotto(userWinningLotto);
        });

        return matchCountList;
    }

    countWinningResult(matchResults) {
        const userLottoList = userModels.getUserLottoList();
        const userBonus = userModels.getUserBonus();
        let winningResults = {};

        matchResults.forEach((matchCount, index) => {
            if (matchCount !== 5) {
                winningResults[`${matchCount}개`] = (winningResults[`${matchCount}개`] || 0) + 1;
                return false;
            }

            const matchLotto = userLottoList[index];
            const hasUserBonus = matchLotto.hasNumber(userBonus);
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
        const userCache = userModels.getUserCache();
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

module.exports = App;
