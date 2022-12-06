/** IMPORT CONSTANTS */
const { DELIMITER } = require('../Constants');

/**
 * 숫자 타입으로 형변환합니다.
 *
 * @param {any} value
 * @returns
 */
function convertToNumber(value) {
  return Number(value);
}

/**
 * 숫자 배열로 변환합니다.
 *
 * @param {string} value
 * @returns
 */
function convertToNumberArray(value) {
  return value.split(DELIMITER).map(convertToNumber);
}

const exportedUtils = {
  convertToNumber,
  convertToNumberArray,
};

module.exports = exportedUtils;
