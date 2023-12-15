import { Console } from '@woowacourse/mission-utils';

const INPUTS = {
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menu: '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

const InputView = {
  async readDate() {
    const INPUT = await Console.readLineAsync(INPUTS.date);
    this.validInput(INPUT);
    return Number(INPUT);
  },

  async readMenu() {
    const INPUT = await Console.readLineAsync(INPUTS.menu);
    this.validInput(INPUT);
    return INPUT.split(',');
  },

  validInput(input) {
    if (!input) {
      throw new Error('[ERROR]');
    }
  },
};
export default InputView;
