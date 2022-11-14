const { Validation, Console } = require('./common');

class HandleException {
    tryValidate(inputValue, validateType) {
        const myValidation = new Validation();
        const { isInvalidation, errorObject } = myValidation.invalidateValue(
            inputValue,
            validateType
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
