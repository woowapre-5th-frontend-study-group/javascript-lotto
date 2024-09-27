const Stastic = require("../src/Stastic");

describe("당첨통계 클래스 테스트", () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 5],
    [[1, 2, 3, 4, 7, 8], [1, 2, 3, 4, 5, 6], 4],
    [[1, 2, 3, 7, 8, 9], [1, 2, 3, 4, 5, 6], 3],
    [[1, 2, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6], 2],
    [[1, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6], 1],
    [[7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6], 0],
  ])(
    "당첨 로또 번호와 발급된 로또 번호의 일치여부 확인 메소드 테스트",
    (first, second, expected) => {
      const stastic = new Stastic([[1, 2, 3, 4, 5, 6]], [1, 2, 3, 4, 5, 6], 1);
      let matchCount = stastic.getMatchCount(first, second);

      expect(matchCount).toEqual(expected);
    }
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 1, 1],
    [[1, 2, 3, 4, 5, 6], 7, 0],
  ]);
  "당첨 로또 번호와 발급된 보너스 번호의 일치여부 확인 메소드 테스트",
    (first, second, expected) => {
      const stastic = new Stastic([[1, 2, 3, 4, 5, 6]], [1, 2, 3, 4, 5, 6], 1);
      let matchCount = stastic.getMatchCount(first, second);

      expect(matchCount).toEqual(expected);
    };
});
