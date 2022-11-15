const {
  sortAscendingNumbers,
  getNumberIntersection,
  addMoneyComma,
  getProfitRate,
} = require("../src/lib/utils");

describe("유틸 테스트", () => {
  test("숫자를 오름차순으로 정렬한다", () => {
    const numbers = [10, 9, 8, 5];
    const answers = [5, 8, 9, 10];

    answers.forEach((answer, index) => {
      expect(sortAscendingNumbers(numbers)[index]).toBe(answer);
    });
  });

  test("숫자 교집합 구하기", () => {
    const arr1 = [1, 2, 3, 5];
    const arr2 = [5, 8, 9, 10];

    expect(getNumberIntersection(arr1, arr2)).toContain(5);
  });

  test("천원 단위로 콤마찍기", () => {
    const moneys = [1000, 1999999];
    const addedMoneyCommas = ["1,000", "1,999,999"];

    moneys.forEach((money, index) => {
      const addedMoneyComma = addedMoneyCommas[index];
      expect(addMoneyComma(money)).toEqual(
        expect.stringContaining(addedMoneyComma)
      );
    });
  });
});
