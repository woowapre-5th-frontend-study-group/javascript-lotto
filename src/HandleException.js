const { Console } = require('@woowacourse/mission-utils');
const Validation = require('./Validation');

class HandleException {
    tryValidate(inputValue, validateType, options = null) {
        const myValidation = new Validation();
        const { isInvalidation, errorObject } = myValidation.invalidateValue(
            inputValue,
            validateType,
            options
        );

        if (isInvalidation) {
            this.returnException(errorObject);
            return;
        }
    }

    returnException(errorObject) {
        Console.print(errorObject.message);
        Console.close();
        throw errorObject;
    }
}

module.exports = HandleException;
