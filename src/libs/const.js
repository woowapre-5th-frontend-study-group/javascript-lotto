const ERROR_MESSAGE = {
  MIN_MONEY: '[ERROR] 구입금액: 1000 이상 입력할 수 있습니다.',
  UNIT_MONEY: '[ERROR] 구입금액: 1000 단위로 로또를 구입해야 합니다.',
  INCLUDE_WINNING_NUMBER:
    '[ERROR] 보너스 번호: 이미 당첨 번호에 포함되어 있습니다.',
};

const MESSAGE = {
  REQUEST_MONEY: '구입금액을 입력해 주세요.\n',
  REQUEST_WINNING_NUMBERS: '\n당첨 번호를 입력해 주세요.\n',
  REQUEST_BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
  WINNING_STATS: '\n당첨 통계\n---',
};

const MONEY = '구입금액';
const LOTTO_NUMBER = '로또 번호';
const WINNING_NUMBER = '당첨 번호';
const BONUS_NUMBER = '보너스 번호';

module.exports = {
  ERROR_MESSAGE,
  MESSAGE,
  MONEY,
  LOTTO_NUMBER,
  WINNING_NUMBER,
  BONUS_NUMBER,
};
