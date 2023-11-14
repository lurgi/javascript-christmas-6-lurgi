/* eslint-disable */
import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../../src/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

describe('출력 테스트', () => {
  test('주문 메뉴 출력', () => {
    const MENU_INFO = {
      티본스테이크: 1,
      바비큐립: 1,
      초코케이크: 2,
      제로콜라: 1,
    };
    const OUTPUTS = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '바비큐립 1개',
      '초코케이크 2개',
      '제로콜라 1개',
    ];
    const logSpy = getLogSpy();
    OutputView.printMenu(MENU_INFO);
    OUTPUTS.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('할인 전, 증정 출력', () => {
    const logSpy = getLogSpy();
    const OUTPUTS = ['<할인 전 총주문 금액>', '142,000원', '<증정 메뉴>', '샴페인 1개'];
    OutputView.printAmount(142000);
    OUTPUTS.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('혜택 출력', () => {
    const logSpy = getLogSpy();
    const MENU_INFO = {
      menuInfo: { 티본스테이크: 1, 바비큐립: 1, 초코케이크: 2, 제로콜라: 1 },
      amountBeforeDiscount: 142000,
      dDayDiscount: 1200,
      weekDayOrEnd: { isWeekEnd: false, weekDiscount: 4046 },
      isStar: true,
    };
    const OUTPUTS = [
      '<혜택 내역>',
      '크리스마스 디데이 할인: -1,200원',
      '평일 할인: -4,046원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-31,246원',
      '<할인 후 예상 결제 금액>',
      '135,754원',
      '<12월 이벤트 배지>',
      '산타',
    ];
    OutputView.setPrintInfo({ MENU_INFO, DATE_INFO: 3 });
    OutputView.printBenefit();
    OUTPUTS.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
