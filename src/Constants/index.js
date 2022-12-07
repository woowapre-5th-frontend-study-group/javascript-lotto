const CONSTANTS = {
  LOTTO: {
    INCLUSIVE_LOWER_NUMBER: 1,
    INCLUSIVE_UPPER_NUMBER: 45,
    NUMBER_COUNT: 6,

    CAHCE: {
      MINIMUM: 1_000,
      BASE_UNIT: 1_000,
    },

    WINNING_PRICE: {
      FIFTH: 5_000,
      FOURTH: 50_000,
      THIRD: 1_500_000,
      SECOND: 30_000_000,
      FIRST: 2_000_000_000,
    },

    FORMAT: {
      SQUARE_BRACKET_OPEN: '[',
      DELIMITER: ', ',
      SQUARE_BRACKET_CLOSE: ']',
    },
  },

  VALIDATION: {
    MESSAGE: {
      NULL: '빈 값이 아닌 다른 값을 입력해주세요.',
      NOT_NUMBERIC: '숫자를 입력해주세요.',
      UNDER_THOUSAND: '1,000원 이상 입력해주세요.',
      NOT_DIVIDED_THOUSAND: '1,000원 단위로만 입력해주세요.',
      NOT_FORMATTED: '숫자와 쉼표(,)로만 입력해주세요.',
      NOT_SIX_LENGTH: '6개의 숫자를 입력해주세요.',
      INCLUDED_NOT_NUMBER: '숫자가 아닌 번호가 있습니다.',
      NOT_IN_RANGE_ARRAY: '1부터 45의 숫자가 아닌 번호가 있습니다.',
      NOT_IN_RANGE: '1부터 45의 숫자여야 합니다.',
      HAS_DUPLICATION: '중복 없이 입력해주세요',
      INCLUDED_WINNING_NUMBER: '당첨 번호에 없는 번호여야 합니다.',
    },

    DELIMITER: ',',
    NULL: '',
  },

  ERROR: {
    HEADING: '[ERROR]',
  },

  QUESTION: {
    USER_CACHE: '구입금액을 입력해 주세요.\n',
    WINNING_NUMBER: '당첨 번호를 입력해 주세요.\n',
    BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n',
  },

  OUTPUT: {
    MESSAGE: {
      LOTTO_COUNT: '개를 구매했습니다.',
      RESULT: `당첨 통계
---
3개 일치 (5,000원) - {0}개,
4개 일치 (50,000원) - {1}개
5개 일치 (1,500,000원) - {2}개
5개 일치, 보너스 볼 일치 (30,000,000원) - {3}개
6개 일치 (2,000,000,000원) - {4}개
총 수익률은 {5}%입니다.`,
    },

    NULL: '',
  },

  replaceParam(message, ...params) {
    let resultMessage = message;

    params.forEach((param, index) => {
      resultMessage = resultMessage.replace(`{${index}}`, param);
    });

    return resultMessage;
  },
};

module.exports = CONSTANTS;
