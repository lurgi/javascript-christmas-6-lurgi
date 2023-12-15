import { Console } from '@woowacourse/mission-utils';

const OUTPUTS = {
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  dateString: (date) =>
    `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
};

const OutputView = {
  printStart() {
    this.printString(OUTPUTS.start);
  },
  printDateString(date) {
    this.printString(OUTPUTS.dateString(date));
  },
  printMenu() {},
  printString(string) {
    Console.print(string);
  },
};

export default OutputView;
