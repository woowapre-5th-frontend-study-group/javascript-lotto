function convertToNumber(source) {
    return +source;
}

function convertToNumberArray(numbers) {
    return numbers.split(',').map((number) => +number);
}

function includeNeitherNumberNorComma(numbers) {
    return [...numbers].some((number) => isNaN(+number) && number !== ',');
}

function isNotInRange(numbers, [from, to]) {
    let numberArray = numbers;

    if (typeof numbers === 'string') {
        numberArray = numbers.split(',');
    }

    return numberArray.some((number) => isNaN(+number) || +number < from || +number > to);
}

function hasDuplication(numbers) {
    let numberArray = numbers;

    if (typeof numbers === 'string') {
        numberArray = numbers.split(',').map((number) => +number);
    }

    const newSetSize = new Set(numberArray).size;
    const numbersSize = numberArray.length;
    return newSetSize !== numbersSize;
}

function isNotLength(numbers, length) {
    if (typeof numbers === 'object') {
        return numbers.length !== length;
    }

    return numbers.split(',').length !== length;
}

function isNotNumber(source) {
    return isNaN(+source);
}

function couldNotBeDevidedBy(number, operand) {
    return !!(+number % operand);
}

function isUnder(number, threshold) {
    return +number < threshold;
}

module.exports = {
    convertToNumber,
    convertToNumberArray,
    includeNeitherNumberNorComma,
    isNotInRange,
    hasDuplication,
    isNotLength,
    isNotNumber,
    couldNotBeDevidedBy,
    isUnder,
};
