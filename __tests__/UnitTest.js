const ExceptionHandler = require('../src/Lib/ExceptionHandler');
const Validator = require('../src/Lib/Validator');

describe('ExceptionHandler 클래스 테스트', () => {
  test.each(['', 'a', '500', '1100'])(
    '금액에 대한 유효성 검사(Expected return: false): validateUserCache(%s)',
    (param) => {
      expect(ExceptionHandler.validateUserCache(param)).toBeFalsy();
    }
  );

  test.each([
    '',
    '123456',
    '1,2,3',
    'a,1,2,3,4,5',
    '0,1,2,3,4,5',
    '1,1,2,3,4,5',
  ])(
    '당첨 번호에 대한 유효성 검사(Expected return: false): validateWinningNumbers(%s)',
    (param) => {
      expect(ExceptionHandler.validateWinningNumbers(param)).toBeFalsy();
    }
  );

  test.each(['', 'a', '0', '46', '1'])(
    '보너스 번호에 대한 유효성 검사(Expected return: false): validateWinningNumbers(%s)',
    (param) => {
      expect(
        ExceptionHandler.validateBonusNumber([1, 2, 3, 4, 5, 6], param)
      ).toBeFalsy();
    }
  );
});

describe('Validator 클래스 테스트', () => {
  test.each(['', ' ', '\n'])(
    '빈 값이 아니어야 한다(throw if not): shouldBeNotNull(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeNotNull().withMessage('빈값');
      }).toThrow();
    }
  );

  test.each(['a', '+', '가'])(
    '숫자여야 한다(throw if not): shouldBeNumberic(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeNumberic().withMessage();
      }).toThrow();
    }
  );

  test.each(['ㅁ,1,2,3,4,5', 'a,b,1,2,3,4', '+,1,a,2,3,4'])(
    '숫자 어레이여야 한다(throw if not): shouldBeNumbericArray(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeNumbericArray().withMessage();
      }).toThrow();
    }
  );

  test.each(['0', '500', '999'])(
    '1000 이상이여야 한다(throw if not): shouldBeNotUnder(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeNotUnder(1000).withMessage();
      }).toThrow();
    }
  );

  test.each(['1001', '1100', '8050'])(
    '1000으로 나뉘어 질 수 있어야 한다(throw if not): shouldBeDividedBy(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeDividedBy(1000).withMessage();
      }).toThrow();
    }
  );

  test.each(['1,2,3,4,5', '1,2,3,', '1,2,3,4,5,6,7,8,9'])(
    '6개여야 한다(throw if not): shouldBeLength(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeLength(6).withMessage();
      }).toThrow();
    }
  );

  test.each(['0', '46,'])(
    '1부터 45 사이여야 한다(throw if not): shouldBeInRange(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeInRange(1, 45).withMessage();
      }).toThrow();
    }
  );

  test.each(['0,1,2,3,4,5', '1,2,3,4,5,46'])(
    '1부터 45 사이인 어레이여야 한다(throw if not): shouldBeInRangeArray(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeInRangeArray(1, 45).withMessage();
      }).toThrow();
    }
  );

  test.each(['123456', '1/2/3/4/5/6'])(
    '형식(,이 들어간)이 맞춰진 입력이여야 한다(throw if not): shouldBeFormatted(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldBeFormatted().withMessage();
      }).toThrow();
    }
  );

  test.each(['1,1,2,3,4,5', '1,1,1,1,1,1'])(
    '중복이 없어야 한다(throw if not): shouldNotDuplicate(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldNotDuplicate().withMessage();
      }).toThrow();
    }
  );

  test.each(['1', '2', '3', '4', '5', '6'])(
    '주어진 어레이의 번호가 없어야 한다(throw if not): shouldNotInclude(%s)',
    (param) => {
      expect(() => {
        new Validator(param).shouldNotInclude([1, 2, 3, 4, 5, 6]).withMessage();
      }).toThrow();
    }
  );
});
