const exitWithError = (errorMsg) => {
  throw new Error(errorMsg);
};

module.exports = exitWithError;
