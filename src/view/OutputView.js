import { Console } from '@woowacourse/mission-utils';

const OUTPUTS = {
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
};

const OutputView = {
  printStart() {
    this.printString(OUTPUTS.start);
  },
  printMenu() {},
  printString(string) {
    Console.print(string);
  },
};

export default OutputView;
