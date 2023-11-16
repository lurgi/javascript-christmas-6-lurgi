/* eslint-disable */
import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../../src/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

describe('출력 테스트', () => {
  let logSpy;
  beforeEach(() => {
    logSpy = getLogSpy();
  });

  const MENU_PRINT_CASES = [
    [
      {
        티본스테이크: 1,
        바비큐립: 1,
        초코케이크: 2,
        제로콜라: 1,
      },
      ['\n<주문 메뉴>', '티본스테이크 1개', '바비큐립 1개', '초코케이크 2개', '제로콜라 1개'],
    ],
    [
      {
        양송이수프: 1,
        바비큐립: 4,
        아이스트림: 4,
      },
      ['\n<주문 메뉴>', '양송이수프 1개', '바비큐립 4개', '아이스트림 4개'],
    ],
  ];
  test.each(MENU_PRINT_CASES)('주문 메뉴 출력', (menuInfo, outputs) => {
    OutputView.printMenu(menuInfo);
    expect(logSpy.mock.calls.map(([output]) => output)).toEqual(outputs);
  });

  const PRESENT_CASE = [
    [142000, ['\n<할인 전 총주문 금액>', '142,000원', '\n<증정 메뉴>', '샴페인 1개']],
    [120000, ['\n<할인 전 총주문 금액>', '120,000원', '\n<증정 메뉴>', '샴페인 1개']],
    [119000, ['\n<할인 전 총주문 금액>', '119,000원', '\n<증정 메뉴>', '없음']],
  ];
  test.each(PRESENT_CASE)('할인 전, 증정 출력', (number, outputs) => {
    OutputView.printAmount(number);
    expect(logSpy.mock.calls.map(([output]) => output)).toEqual(outputs);
  });

  const BENEFIT_CASE = [
    [
      {
        menuInfo: { 티본스테이크: 1, 바비큐립: 1, 초코케이크: 2, 제로콜라: 1 },
        amountBeforeDiscount: 142000,
        dDayDiscount: 1200,
        weekDayOrEnd: { isWeekEnd: false, weekDiscount: 4046 },
        isStar: true,
        reserveDate: 3,
      },
      [
        '\n<혜택 내역>',
        '크리스마스 디데이 할인: -1,200원',
        '평일 할인: -4,046원',
        '특별 할인: -1,000원',
        '증정 이벤트: -25,000원',
        '\n<총혜택 금액>',
        '-31,246원',
        '\n<할인 후 예상 결제 금액>',
        '135,754원',
        '\n<12월 이벤트 배지>',
        '산타',
      ],
    ],
    [
      {
        menuInfo: { 타파스: 1, 제로콜라: 1 },
        amountBeforeDiscount: 8500,
        dDayDiscount: 0,
        weekDayOrEnd: { isWeekEnd: false, weekDiscount: 0 },
        isStar: false,
        reserveDate: 3,
      },
      [
        '\n<혜택 내역>',
        '없음',
        '\n<총혜택 금액>',
        '0원',
        '\n<할인 후 예상 결제 금액>',
        '8,500원',
        '\n<12월 이벤트 배지>',
        '없음',
      ],
    ],
  ];
  test.each(BENEFIT_CASE)('혜택 출력', (printInfo, outputs) => {
    OutputView.setPrintInfo(printInfo);
    OutputView.printBenefit();
    expect(logSpy.mock.calls.map(([output]) => output)).toEqual(outputs);
  });
});
