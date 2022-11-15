class ProfitRate {
  totalRevenue;
  purchaseAmout;

  constructor(purchaseAmout, totalRevenue) {
    this.purchaseAmout = purchaseAmout;
    this.totalRevenue = totalRevenue;
  }

  getProfitRate = () => {
    return (
      100 +
      ((this.totalRevenue - this.purchaseAmout) / this.purchaseAmout) * 100
    );
  };
}

module.exports = ProfitRate;
