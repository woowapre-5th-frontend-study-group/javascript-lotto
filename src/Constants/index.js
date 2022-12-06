const CONSTANTS = {
  LOTTO: {
    INCLUSIVE_LOWER_NUMBER: 1,
    INCLUSIVE_UPPER_NUMBER: 45,
    NUMBER_COUNT: 6,
  },

  VALIDATION: {
    MESSAGE: {
      NULL: '값을 입력해주세요~',
      NOT_NUMBERIC: '숫자여야 합니다~',
      UNDER_THOUSAND: '1,000원 이상은 구매하셔야 해요~',
      NOT_DIVIDED_THOUSAND: '1,000원 단위로만 입력해주세요~',
      NOT_FORMATTED: '숫자와 쉼표(,)로만 입력해주세요~',
      NOT_SIX_LENGTH: '6개의 숫자를 입력해주세용',
      INCLUDED_NOT_NUMBER: '숫자가 아닌 번호가 있습니당',
      NOT_IN_RANGE_ARRAY: '1부터 45의 숫자가 아닌 번호가 있습니다.',
      NOT_IN_RANGE: '1부터 45의 숫자여야 합니다.',
      HAS_DUPLICATION: '중복 없이 입력해주세요',
      INCLUDED_WINNING_NUMBER: '당첨 번호에 없는 번호여야 합니다.',
    },

    DELIMITER: ',',
  },
};

module.exports = CONSTANTS;
