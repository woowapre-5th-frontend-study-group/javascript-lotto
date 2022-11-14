const ENTER_MESSAGE = {
  PURCHASE_AMOUT: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요.\n",
};

const winningRanking = [
  {
    winningNumberMatch: 3,
    prizeMoney: 5000,
    isBonusNumberMatch: false,
    count: 0,
  },
  {
    winningNumberMatch: 4,
    prizeMoney: 50000,
    isBonusNumberMatch: false,
    count: 0,
  },
  {
    winningNumberMatch: 5,
    prizeMoney: 1500000,
    isBonusNumberMatch: false,
    count: 0,
  },
  {
    winningNumberMatch: 5,
    prizeMoney: 30000000,
    isBonusNumberMatch: true,
    count: 0,
  },
  {
    winningNumberMatch: 6,
    prizeMoney: 2000000000,
    isBonusNumberMatch: false,
    count: 0,
  },
];

module.exports = { winningRanking, ENTER_MESSAGE };
