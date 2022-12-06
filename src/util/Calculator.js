const Value = require("../constant/Value");

const Calculator = {
  purchaseQuantity(purchaseAmount) {
    return purchaseAmount / Value.lottoPrice;
  },
};

module.exports = Calculator;
