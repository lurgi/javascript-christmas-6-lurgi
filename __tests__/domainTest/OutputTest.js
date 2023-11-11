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
    const OUTPUTS = [
      '<할인 전 총주문 금액>',
      '142,000원',
      '<증정 메뉴>',
      '샴페인 1개',
    ];
    OutputView.printAmount(142000);
    OUTPUTS.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
