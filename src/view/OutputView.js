import { Console } from '@woowacourse/mission-utils';

const OUTPUTS = {
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  dateString: (date) =>
    `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  menuTitle: '\n<주문 메뉴>',
  menuString: (name, cnt) => `${name} ${cnt}개`,
  amountBeforeDiscountTitle: '\n<할인 전 총주문 금액>',
  amountBeforeDiscountString: (amount) => `${amount.toLocaleString()}원`,
};

const OutputView = {
  printStart() {
    this.print(OUTPUTS.start);
  },

  printDateString(date) {
    this.print(OUTPUTS.dateString(date));
  },

  printMenu(menu) {
    this.print(OUTPUTS.menuTitle);
    menu.forEach(([name, cnt]) => {
      this.print(OUTPUTS.menuString(name, cnt));
    });
  },

  printAMountBeforeDiscount(amount) {
    this.print(OUTPUTS.amountBeforeDiscountTitle);
    this.print(OUTPUTS.amountBeforeDiscountString(amount));
  },

  print(string) {
    Console.print(string);
  },
};

export default OutputView;
