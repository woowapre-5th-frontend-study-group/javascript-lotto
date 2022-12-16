//입력 메시지
const INPUT_MESSAGE = {
    PURCHASE: "구입금액을 입력해 주세요.\n",
    GUESS: "\n당첨 번호를 입력해 주세요.\n",
    BONUS: "\n보너스 번호를 입력해 주세요.\n"
}

//출력 메시지
const PURCHASE_RESULT_MESSAGE = '개를 구매했습니다.';
const GAME_STATISTICS = '\n당첨 통계\n---';

//에러 메시지
const BASE_MESSAGE = "[ERROR] ";
const ERROR_MESSAGE = {
    NOT_NUMBER: BASE_MESSAGE + '숫자만 입력해주세요.\n',
    UNIT_ERROR: BASE_MESSAGE + '1000 단위로 입력해주세요.\n',
    RANGE_ERROR: BASE_MESSAGE + '로또 번호는 1부터 45 사이의 숫자여야 합니다.\n',
    DUPLICATED: BASE_MESSAGE + '중복된 숫자 없이 입력해주세요.\n',
    SIX_NUM: BASE_MESSAGE + '로또 번호는 6개의 숫자를 입력해주세요.\n',
    BONUS_ERROR: BASE_MESSAGE + '보너스 번호와 동일한 당첨 번호가 있습니다.\n'
}

//로또 번호의 숫자 범위
const NUM_RANGE = {
    START: 1,
    END: 45
}

//구입 금액 단위 
const MONEY_UNIT = 1000;

//당첨 통계
const PRIZE = {
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000
}

const getPrize = (matchCount, isBonusIncluded) => {
    if(matchCount == 3) return PRIZE.FIFTH;
    if(matchCount == 4) return PRIZE.FOURTH;
    if(matchCount == 5 && !isBonusIncluded) return PRIZE.THIRD;
    if(matchCount == 5 && isBonusIncluded) return PRIZE.SECOND;
    if(matchCount == 6) return PRIZE.FIRST; 
}

module.exports = { INPUT_MESSAGE, PURCHASE_RESULT_MESSAGE, GAME_STATISTICS, ERROR_MESSAGE, NUM_RANGE, MONEY_UNIT, PRIZE, getPrize }