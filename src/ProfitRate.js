class ProfitRate {
  number;
  constructor(purchaseAmout, totalRevenue) {
    this.number = (purchaseAmout / totalRevenue) * 100;
  }
}
