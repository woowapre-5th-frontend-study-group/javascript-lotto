const { describe, expect, test } = require('@jest/globals');
const checkValue = require('../src/libs/checkValue');

describe('checkValue.money() 테스트', () => {
  test.each([['1000j'], ['hello']])(
    '숫자가 아닌 값을 매개변수로 받으면 errorMsg의 값이 존재하는 객체를 반환한다. checkValue.money(%s)',
    (money) => {
      expect(checkValue.money(money)).toEqual({
        errorMsg: '[ERROR] 구입금액: 숫자만 입력할 수 있습니다.',
      });
    }
  );

  test.each([[100], [999]])(
    '1000보다 작은 값을 매개변수로 받으면 errorMsg의 값이 존재하는 객체를 반환한다. checkValue.money(%d)',
    (money) => {
      expect(checkValue.money(money)).toEqual({
        errorMsg: '[ERROR] 구입금액: 1000 이상 입력할 수 있습니다.',
      });
    }
  );

  test.each([[1200], [5500]])(
    '1000단위가 아닌 값을 매개변수로 받으면 errorMsg의 값이 존재하는 객체를 반환한다. checkValue.money(%d)',
    (money) => {
      expect(checkValue.money(money)).toEqual({
        errorMsg: '[ERROR] 구입금액: 1000 단위로 로또를 구입해야 합니다.',
      });
    }
  );

  test.each([[4000], [5000], [18000]])(
    '조건에 만족하는 값을 매개변수로 받으면 errorMsg는 undefined이다. checkValue.money(%d)',
    (money) => {
      expect(checkValue.money(money)).toEqual({
        errorMsg: undefined,
      });
    }
  );
});
