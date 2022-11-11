const Utils = require('./Utils');

const errorType = {
    isNotSixLength: new Error('[ERROR] 6개의 번호를 입력해주세요.'),
    includeNeitherNumberNorComma: new Error('[ERROR] 번호와 쉼표(,) 이외의 문자를 입력하였습니다.'),
    isInNotRangeFromOneToFortyFive: new Error(
        '[ERROR] 1부터 45 사이가 아닌 번호를 입력하였습니다.'
    ),
    hasDuplication: new Error('[ERROR] 번호가 중복되었습니다.'),
    isNotNumber: new Error('[ERROR] 숫자 이외의 문자를 입력하였습니다.'),
    isUnderThousand: new Error('[ERROR] 금액이 부족하여 로또를 구매할 수 없습니다.'),
    couldNotBeDevidedByThousand: new Error('[ERROR] 1,000원 단위의 금액이 아닙니다.'),
    isInWinningNumber: new Error('[ERROR] 입력한 당첨 번호들 이외의 번호를 입력해주세요.'),
    null: '',
};

class Validation {
    static VALIDATE_TYPE = {
        CACHE: 'cache',
        LOTTO: 'lotto',
        BONUS: 'bonus',
    };

    invalidateValue(inputValue, validateType, options = null) {
        const checkValidation = this.getValidateCondition(inputValue, validateType, options);

        const [matchError] = Object.entries(checkValidation).filter(([_, value]) => value);
        const [errorName, _] = matchError || [null, null];
        const validateResult = {
            isInvalidation: !!errorName,
            errorObject: errorType[errorName],
        };

        return validateResult;
    }

    getValidateCondition(inputValue, validateType, options = null) {
        const validateCondition = {
            [Validation.VALIDATE_TYPE.CACHE]: {
                isNotNumber: Utils.isNotNumber(inputValue),
                isUnderThousand: Utils.isUnder(inputValue, 1000),
                couldNotBeDevidedByThousand: Utils.couldNotBeDevidedBy(inputValue, 1000),
            },

            [Validation.VALIDATE_TYPE.LOTTO]: {
                isNotSixLength: Utils.isNotLength(inputValue, 6),
                includeNeitherNumberNorComma: Utils.includeNeitherNumberNorComma(inputValue),
                isInNotRangeFromOneToFortyFive: Utils.isNotInRange(inputValue, [1, 45]),
                hasDuplication: Utils.hasDuplication(inputValue),
            },

            [Validation.VALIDATE_TYPE.BONUS]: {
                isNotNumber: Utils.isNotNumber(inputValue),
                isInNotRangeFromOneToFortyFive: Utils.isNotInRange(inputValue, [1, 45]),
                isInWinningNumber: null,
            },
        };

        if (options) {
            validateCondition[validateType] = {
                ...validateCondition[validateType],
                ...options,
            };
        }

        return validateCondition[validateType];
    }
}

module.exports = Validation;
