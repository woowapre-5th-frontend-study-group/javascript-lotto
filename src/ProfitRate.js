class ProfitRate {
  number;
  constructor(purchaseAmout, totalRevenue) {
    this.number = ((totalRevenue - purchaseAmout) / purchaseAmout) * 100;
  }
}

module.exports = ProfitRate;
