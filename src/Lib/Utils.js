function convertToNumber(value) {
  return Number(value);
}

function convertToNumberArray(value) {
  return value.split(",").map(convertToNumber);
}

const exportedUtils = {
  convertToNumber,
  convertToNumberArray,
};

module.exports = exportedUtils;
