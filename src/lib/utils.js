const sortAscendingNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};

const getIntersection = (arr1, arr2) => {
  return arr1.filter((x) => arr2.includes(x));
};

const addMoneyComma = (money) => {
  return money.toLocaleString();
};

module.exports = {
  sortAscendingNumbers,
  getIntersection,
  addMoneyComma,
};
