import { Console } from '@woowacourse/mission-utils';

const INPUTS = {
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
};

const InputView = {
  async readDate() {
    const INPUT = await Console.readLineAsync(INPUTS.date);
    this.validInput(INPUT);
    return Number(INPUT);
  },

  validInput(input) {
    if (!input) {
      throw new Error('[ERROR]');
    }
  },
};
export default InputView;
