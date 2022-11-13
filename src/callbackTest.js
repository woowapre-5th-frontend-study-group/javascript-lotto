const { Console } = require('@woowacourse/mission-utils');

const VALIDATE_TYPE = {
    CACHE: 'Cache',
    LOTTO: 'Lotto',
    BONUS: 'Bonus',
};

const QUESTION_MESSAGE = {
    [VALIDATE_TYPE.CACHE]: '구입금액을 입력해 주세요.\n',
    [VALIDATE_TYPE.LOTTO]: '\n당첨 번호를 입력해 주세요.\n',
    [VALIDATE_TYPE.BONUS]: '\n보너스 번호를 입력해 주세요.\n',
};

class Test {
    constructor() {
        this._userCache = null;
        this._userLotto = null;
        this._userBonus = null;

        this._callbackHandler = null;
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

    loopCallback(...callbackList) {
        const hasNoCallbackHandler = this.getCallbackHandler() === null;
        if (hasNoCallbackHandler) {
            this.setCallbackHandler(...callbackList);
        }

        const callbackHandler = this.getCallbackHandler();

        let callbackResult = callbackHandler.next();
        if (callbackResult.done) {
            this.printAll();
            Console.close();
            return;
        }

        const { callbackName: questionType, extraCallback } = callbackResult.value;

        Console.readLine(QUESTION_MESSAGE[questionType], (param) => {
            // const handleException = new HandleException();
            // handleException.tryValidate(param, validateType);

            this[`setUser${questionType}`](param);

            if (extraCallback) {
                extraCallback();
            }

            this.loopCallback(...callbackList);
        });
    }

    setUserCache(userCache) {
        this._userCache = userCache;
    }

    setUserLotto(userLotto) {
        this._userLotto = userLotto;
    }

    setUserBonus(userBonus) {
        this._userBonus = userBonus;
    }

    printAll() {
        console.log(
            `userCache: ${this._userCache} / userLotto: ${this._userLotto} / userBonus: ${this._userBonus}`
        );
    }
}

// new Test().questionInput(VALIDATE_TYPE.CACHE, VALIDATE_TYPE.LOTTO, VALIDATE_TYPE.BONUS);

const MY_CALLBACK_LIST = [
    {
        callbackName: VALIDATE_TYPE.CACHE,
        extraCallback: function () {
            console.log('after Inputed cache');
        },
    },
    {
        callbackName: VALIDATE_TYPE.LOTTO,
        extraCallback: function () {
            console.log('after Inputed lotto');
        },
        // extraOptions: {
        //     isInWinningNumber: this.isInWinningNumber(bonusNumber),
        // },
    },
    {
        callbackName: VALIDATE_TYPE.BONUS,
        extraCallback: function () {
            console.log('after Inputed bonus');
        },
    },
];

new Test().loopCallback(...MY_CALLBACK_LIST);
