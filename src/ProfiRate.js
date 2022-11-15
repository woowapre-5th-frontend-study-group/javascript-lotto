const { Console } = require("@woowacourse/mission-utils");
const { getProfitRate } = require("./lib/utils");
const { PRINT_MESSAGE } = require("./lib/constants");

class ProfitRate {
  totalRevenue;
  purchaseAmout;

  constructor(purchaseAmout, totalRevenue) {
    this.purchaseAmout = purchaseAmout;
    this.totalRevenue = totalRevenue;
  }

  printProfitRate() {
    const profitRate = getProfitRate(this.purchaseAmout, this.totalRevenue);
    Console.print(PRINT_MESSAGE.PROFIT_RATE(profitRate));
  }
}

module.exports = ProfitRate;
