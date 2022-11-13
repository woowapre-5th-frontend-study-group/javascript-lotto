const { describe, expect, test } = require('@jest/globals');
const Lottos = require('../src/Lottos');

describe('Lottos 클래스 생성 테스트', () => {
  test.each([['8000j'], ['5000x'], ['구입합니다.']])(
    '구입 금액이 숫자가 아니라면 예외가 발생한다. 구입금액: %s',
    (money) => {
      expect(() => {
        new Lottos(money);
      }).toThrow('[ERROR] 구입금액: 숫자만 입력할 수 있습니다.');
    }
  );

  test.each([['120'], ['999'], ['-200']])(
    '구입 금액이 1000보다 작으면 예외가 발생한다. 구입금액: %s',
    (money) => {
      expect(() => {
        new Lottos(money);
      }).toThrow('[ERROR] 구입금액: 1000 이상 입력할 수 있습니다.');
    }
  );

  test.each([['1200'], ['5500'], ['13001']])(
    '구입 금액은 1000단위여야 한다. 그렇지 않으면 예외가 발생한다. 구입금액: %s',
    (money) => {
      expect(() => {
        new Lottos(money);
      }).toThrow('[ERROR] 구입금액: 1000 단위로 로또를 구입해야 합니다.');
    }
  );

  test.each([
    ['6000', 6],
    ['8000', 8],
    ['19000', 19],
  ])(
    'Lotts 클래스 생성 테스트, 구입금액: %s, 로또 개수: %d',
    (money, count) => {
      const lottos = new Lottos(money);
      expect(lottos.count).toEqual(count);
    }
  );
});
