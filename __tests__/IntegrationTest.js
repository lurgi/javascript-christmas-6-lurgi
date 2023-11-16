import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App';

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

const TEST_CASES = [
  [
    ['35', '25', '해산물파스타-1,해산물파스타-2', '해산물파스타-5,초코케이크-5'],
    [
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
      '12월 25일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '\n<주문 메뉴>',
      '해산물파스타 5개',
      '초코케이크 5개',
      '\n<할인 전 총주문 금액>',
      '250,000원',
      '\n<증정 메뉴>',
      '샴페인 1개',
      '\n<혜택 내역>',
      '크리스마스 디데이 할인: -3,400원',
      '평일 할인: -10,115원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '\n<총혜택 금액>',
      '-39,515원',
      '\n<할인 후 예상 결제 금액>',
      '235,485원',
      '\n<12월 이벤트 배지>',
      '산타',
    ],
  ],
  [
    [
      '0',
      '29',
      '티본스테이크-5,바비큐립-5,초코케이크-6,제로콜라-5',
      '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1',
    ],
    [
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
      '12월 29일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '\n<주문 메뉴>',
      '티본스테이크 1개',
      '바비큐립 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '\n<할인 전 총주문 금액>',
      '142,000원',
      '\n<증정 메뉴>',
      '샴페인 1개',
      '\n<혜택 내역>',
      '주말 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '\n<총혜택 금액>',
      '-29,046원',
      '\n<할인 후 예상 결제 금액>',
      '137,954원',
      '\n<12월 이벤트 배지>',
      '산타',
    ],
  ],
  [
    ['18', '아이스크림-1,제로콜라-1'],
    [
      '12월 18일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '\n<주문 메뉴>',
      '아이스크림 1개',
      '제로콜라 1개',
      '\n<할인 전 총주문 금액>',
      '8,000원',
      '\n<증정 메뉴>',
      '없음',
      '\n<혜택 내역>',
      '없음',
      '\n<총혜택 금액>',
      '0원',
      '\n<할인 후 예상 결제 금액>',
      '8,000원',
      '\n<12월 이벤트 배지>',
      '없음',
    ],
  ],
  [
    ['24', '해산물파스타-2'],
    [
      '12월 24일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '\n<주문 메뉴>',
      '해산물파스타 2개',
      '\n<할인 전 총주문 금액>',
      '70,000원',
      '\n<증정 메뉴>',
      '없음',
      '\n<혜택 내역>',
      '크리스마스 디데이 할인: -3,300원',
      '특별 할인: -1,000원',
      '\n<총혜택 금액>',
      '-4,300원',
      '\n<할인 후 예상 결제 금액>',
      '65,700원',
      '\n<12월 이벤트 배지>',
      '없음',
    ],
  ],
];

describe('통합 테스트', () => {
  test.each(TEST_CASES)('통합 테스트', async (ANSWERS, OUTPUTS) => {
    mockQuestions(ANSWERS);
    const logSpy = getLogSpy();
    await new App().run();
    expect(logSpy.mock.calls.map(([output]) => output)).toEqual(OUTPUTS);
  });
});
