const { Utils, myUserModels } = require('./common');

const errorType = {
    NOT_SIX_LENGTH: new Error('[ERROR] 6개의 번호를 입력해주세요.'),
    INCLUDE_NEITHER_NUMBER_NOR_COMMA: new Error(
        '[ERROR] 번호와 쉼표(,) 이외의 문자를 입력하였습니다.'
    ),
    NOT_RANGE_FROM_ONE_TO_FORTYFIVE: new Error(
        '[ERROR] 1부터 45 사이가 아닌 번호를 입력하였습니다.'
    ),
    DUPLICATED_NUMBER: new Error('[ERROR] 번호가 중복되었습니다.'),
    NOT_NUMBER: new Error('[ERROR] 숫자 이외의 문자를 입력하였습니다.'),
    COULD_NOT_BUY: new Error('[ERROR] 금액이 부족하여 로또를 구매할 수 없습니다.'),
    COULD_NOT_BE_DEVIDED_BY_THOUSAND: new Error('[ERROR] 1,000원 단위의 금액이 아닙니다.'),
    IN_WINNING_NUMBER: new Error('[ERROR] 입력한 당첨 번호들 이외의 번호를 입력해주세요.'),
    null: '',
};

class Validation {
    static VALIDATE_TYPE = {
        CACHE: 'Cache',
        LOTTO: 'LottoList',
        BONUS: 'Bonus',
    };

    invalidateValue(inputValue, validateType) {
        const checkValidation = this.getValidateCondition(inputValue, validateType);

        const [matchError] = Object.entries(checkValidation).filter(([_, value]) => value);
        const [errorName, _] = matchError || [null, null];
        const validateResult = {
            isInvalidation: !!errorName,
            errorObject: errorType[errorName],
        };

        return validateResult;
    }

    getValidateCondition(inputValue, validateType) {
        const validateCondition = {
            [Validation.VALIDATE_TYPE.CACHE]: {
                NOT_NUMBER: this.isNotNumber(inputValue),
                COULD_NOT_BUY: this.isUnderThousand(inputValue),
                COULD_NOT_BE_DEVIDED_BY_THOUSAND: this.couldNotBeDevidedByThousand(inputValue),
            },

            [Validation.VALIDATE_TYPE.LOTTO]: {
                NOT_SIX_LENGTH: this.isNotSixLength(inputValue),
                INCLUDE_NEITHER_NUMBER_NOR_COMMA: this.includeNeitherNumberNorComma(inputValue),
                NOT_RANGE_FROM_ONE_TO_FORTYFIVE: this.isNotInRangeFromOneToFortyFive(inputValue),
                DUPLICATED_NUMBER: Utils.hasDuplication(inputValue),
            },

            [Validation.VALIDATE_TYPE.BONUS]: {
                NOT_NUMBER: this.isNotNumber(inputValue),
                NOT_RANGE_FROM_ONE_TO_FORTYFIVE: this.isNotInRangeFromOneToFortyFive(inputValue),
                IN_WINNING_NUMBER: this.isInWinningNumber(inputValue),
            },
        };

        return validateCondition[validateType];
    }

    isNotNumber(source) {
        return !Utils.isNumber(source);
    }

    isUnderThousand(number) {
        return Utils.isUnder(number, 1000);
    }

    couldNotBeDevidedByThousand(number) {
        return !Utils.canDivideBy(number, 1000);
    }

    isNotSixLength(source) {
        return !Utils.isLength(source, 6);
    }

    includeNeitherNumberNorComma(source) {
        return !Utils.hasElement(source, ',') || !!Utils.convertToNumberArray(source);
    }

    isNotInRangeFromOneToFortyFive(numbers) {
        return !Utils.isInRange(numbers, [1, 45]);
    }

    isInWinningNumber(number) {
        const winningLotto = myUserModels.getUserWinningLotto();
        return winningLotto.hasNumber(number);
    }
}

module.exports = Validation;
