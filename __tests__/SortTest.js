const { sortAscendingNumbers } = require("../src/utils");

describe("정렬 테스트", () => {
  test("숫자를 오름차순으로 정렬한다", () => {
    const numbers = [10, 9, 8, 5];
    const answers = [5, 8, 9, 10];

    answers.forEach((answer, index) => {
      expect(sortAscendingNumbers(numbers)[index]).toBe(answer);
    });
  });
});
