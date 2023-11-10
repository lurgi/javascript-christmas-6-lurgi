import { Console } from '@woowacourse/mission-utils';
import ReserveDate from './Model/ReserveDate';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );
    this.validate(input);
    const RESERVE_DATE = new ReserveDate(Number(input));
    return RESERVE_DATE;
  },

  validate(input) {
    if (input.trim() === '') {
      throw new Error('[ERROR]');
    }
  },
};

export default InputView;
