import { Console } from '@woowacourse/mission-utils';

const DATE_QUESTION = '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n';
const MENU_QUESTION = `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n`;

const DIVIDE_SYMBOL = ',';

const ERROR_MESSAGE = '[ERROR] 입력하지 않으셨습니다.';

const InputView = Object.freeze({
  async readDate() {
    const input = await Console.readLineAsync(DATE_QUESTION);
    this.validInput(input);

    return Number(input);
  },

  async readMenu() {
    const input = await Console.readLineAsync(MENU_QUESTION);
    this.validInput(input);

    return input.split(DIVIDE_SYMBOL);
  },

  validInput(input) {
    if (!input.trim()) {
      throw new Error(ERROR_MESSAGE);
    }
  },
});

export default InputView;
