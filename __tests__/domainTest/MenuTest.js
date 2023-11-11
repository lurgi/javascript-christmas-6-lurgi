import ReserveMenu from '../../src/Model/ReserveMenu';

describe('메뉴 모델 유효성', () => {
  const ERROR_CASE = [
    [['양송이파스타-1']],
    [['양송이수프-2', '크리스마스파스타-0']],
    [['양송이수프-4-1']],
    [['양송이수프-1', '양송이수프-2']],
    [['티본스테이크-1바비큐립-1']],
  ];
  test.each(ERROR_CASE)('모델 생성 에러', (menu) => {
    expect(() => new ReserveMenu(menu)).toThrow('[ERROR]');
  });

  const PASS_CASE = [
    [['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1']],
    [['타파스-1', '제로콜라-1']],
  ];
  test.each(PASS_CASE)('모델 생성 성공', (menu) => {
    expect(new ReserveMenu(menu)).toBeTruthy();
  });
});

describe('음료만 주문 여부', () => {
  const ERROR_CASE = [
    [['제로콜라-4']],
    [['레드와인-1']],
    [['제로콜라-1', '레드와인-1', '샴페인-1']],
  ];
  test.each(ERROR_CASE)('음료만 주문 실패', (menu) => {
    expect(() => new ReserveMenu(menu)).toThrow('[ERROR]');
  });
});

describe('메뉴 20개 넘는가?', () => {
  const ERROR_CASE = [
    [['티본스테이크-5', '바비큐립-5', '초코케이크-5', '제로콜라-6']],
    [['타파스-20', '제로콜라-1']],
  ];
  test.each(ERROR_CASE)('20개 초과 실패', (menu) => {
    expect(() => new ReserveMenu(menu)).toThrow('[ERROR]');
  });
});

describe('할인 로직', () => {
  test('할인 전 금액', () => {
    const MENU = ['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1'];
    const RESERVE_MENU = new ReserveMenu(MENU);
    expect(RESERVE_MENU.getAmount()).toBe(142000);
  });
});
