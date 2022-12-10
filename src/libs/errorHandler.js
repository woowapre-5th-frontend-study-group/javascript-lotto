const { ERROR_HEADING } = require('./const');

const errorHandler = (errorMsg) => {
  throw new Error(`${ERROR_HEADING} ${errorMsg}`);
};

module.exports = errorHandler;
