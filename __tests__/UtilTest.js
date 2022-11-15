const { sortAscendingNumbers, getIntersection } = require("../src/lib/utils");

describe("유틸 테스트", () => {
  test("숫자를 오름차순으로 정렬한다", () => {
    const numbers = [10, 9, 8, 5];
    const answers = [5, 8, 9, 10];

    answers.forEach((answer, index) => {
      expect(sortAscendingNumbers(numbers)[index]).toBe(answer);
    });
  });
  test("교집합 구하기", () => {
    const arr1 = [1, 2, 3, 5];
    const arr2 = [5, 8, 9, 10];

    expect(getIntersection(arr1, arr2)).toContain(5);
  });
});
