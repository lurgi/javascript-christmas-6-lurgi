import ReserveDate from '../../src/Model/ReserveDate';

describe('날짜 모델 유효성', () => {
  const ERROR_CASE = [[0], [32], [NaN], [3224], [-1]];
  test.each(ERROR_CASE)('모델 생성 에러', (menu) => {
    expect(() => new ReserveDate(menu)).toThrow('[ERROR]');
  });

  const PASS_CASE = Array.from({ length: 31 }, (_, index) => index + 1);
  test.each(PASS_CASE)('모델 생성 성공', (menu) => {
    expect(new ReserveDate(menu)).toBeTruthy();
  });
});

describe('할인 로직', () => {
  const CASES = [
    [1, 1000],
    [25, 3400],
    [10, 1900],
    [31, false],
  ];
  test.each(CASES)('디데이 할인', (number, expectResult) => {
    const RESERVE_DATE = new ReserveDate(number);
    expect(RESERVE_DATE.dDayDiscount()).toStrictEqual(expectResult);
  });

  const DAY = [[3], [4], [5], [6], [7], [10], [11], [25], [31]];
  test.each(DAY)('평일', (number) => {
    const RESERVE_DATE = new ReserveDate(number);
    expect(RESERVE_DATE.isWeekEnd()).toBeFalsy();
  });

  const END = [[1], [2], [8], [9], [15], [16], [22], [23], [29], [30]];
  test.each(END)('주말', (number) => {
    const RESERVE_DATE = new ReserveDate(number);
    expect(RESERVE_DATE.isWeekEnd()).toBeTruthy();
  });
});
