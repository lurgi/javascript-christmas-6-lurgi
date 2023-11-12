import App from '../src/App';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

describe('통합 테스트', () => {
  test('통합 테스트 1', async () => {
    const ANSWERS = [
      '35',
      '25',
      '해산물파스타-1,해산물파스타-2',
      '해산물파스타-5,초코케이크-5',
    ];
    const OUTPUTS = [
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
      '<할인 전 총주문 금액>',
      '250,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -3,400원',
      '평일 할인: -10,115원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '39,515원',
      '<할인 후 예상 결제 금액>',
      '235,485원',
      '<12월 이벤트 배지>',
      '산타',
    ];
    mockQuestions(ANSWERS);
    const logSpy = getLogSpy();
    await new App().run();
    OUTPUTS.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('통합 테스트 1', async () => {
    const ANSWERS = [
      '0',
      '29',
      '티본스테이크-5,바비큐립-5,초코케이크-6,제로콜라-5',
      '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1',
    ];
    const OUTPUTS = [
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
      '<할인 전 총주문 금액>',
      '142,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '주말 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-29,046원',
      '<할인 후 예상 결제 금액>',
      '137,954원',
      '<12월 이벤트 배지>',
      '산타',
    ];
    mockQuestions(ANSWERS);
    const logSpy = getLogSpy();
    await new App().run();
    OUTPUTS.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
