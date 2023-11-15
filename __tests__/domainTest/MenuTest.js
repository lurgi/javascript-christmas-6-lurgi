import ReserveMenu from '../../src/Model/ReserveMenu';

// eslint-disable-next-line
describe('메뉴 모델 생성', () => {
  const ERROR_CASE = [
    [['양송이파스타-1']],
    [['양송이수프-2', '크리스마스파스타-0']],
    [['양송이수프-4-1']],
    [['양송이수프-1', '양송이수프-2']],
    [['티본스테이크-1바비큐립-1']],
    [['제로콜라-4']],
    [['레드와인-1']],
    [['제로콜라-1', '레드와인-1', '샴페인-1']],
    [['티본스테이크-5', '바비큐립-5', '초코케이크-5', '제로콜라-6']],
    [['타파스-20', '제로콜라-1']],
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

  // eslint-disable-next-line
  describe('할인가 계산', () => {
    const DISCOUNT_CASES = [
      [
        ['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1'],
        [142000, 4046, 4046],
      ],
      [
        ['양송이수프-1', '타파스-1', '크리스마스파스타-4', '아이스크림-5'],
        [136500, 10115, 8092],
      ],
      [
        ['양송이수프-4', '타파스-4', '시저샐러드-4', '레드와인-1'],
        [138000, 0, 0],
      ],
    ];

    test.each(DISCOUNT_CASES)('할인 전 금액', (menu, price) => {
      const RESERVE_MENU = new ReserveMenu(menu);
      expect(RESERVE_MENU.getAmount()).toBe(price[0]);
    });

    test.each(DISCOUNT_CASES)('평일 디저트 할인', (menu, price) => {
      const RESERVE_MENU = new ReserveMenu(menu);
      expect(RESERVE_MENU.applyWeekDayDiscount()).toBe(price[1]);
    });

    test.each(DISCOUNT_CASES)('주말 메인 할인', (menu, price) => {
      const RESERVE_MENU = new ReserveMenu(menu);
      expect(RESERVE_MENU.applyWeekEndDiscount()).toBe(price[2]);
    });
  });
});
