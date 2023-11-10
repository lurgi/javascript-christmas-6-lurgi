import { Console } from '@woowacourse/mission-utils';
import ReserveDate from './Model/ReserveDate';
import ReserveMenu from './Model/ReserveMenu';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );
    this.validate(input);
    const RESERVE_DATE = new ReserveDate(Number(input));
    return RESERVE_DATE;
  },

  async readMenu() {
    const input = await Console.readLineAsync(
      `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)`,
    );
    this.validate(input);
    const MENU_INFO = input.split(',');
    const RESERVE_MENU = new ReserveMenu(MENU_INFO);
    return RESERVE_MENU;
  },

  validate(input) {
    if (input.trim() === '') {
      throw new Error('[ERROR]');
    }
  },
};

export default InputView;
