import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printResult({
    menuInfo,
    amountBeforeDiscount,
    dDayDiscount,
    weekDayOrEnd,
    starDiscount,
  }) {
    this.printMenu(menuInfo);
    this.printAmount(amountBeforeDiscount);
    this.printBenefit(
      amountBeforeDiscount,
      dDayDiscount,
      weekDayOrEnd,
      starDiscount,
    );
  },

  printMenu(menu) {
    Console.print('\n<주문 메뉴>');
    Object.keys(menu).forEach((name) => {
      const CNT = menu[name];
      Console.print(`${name} ${CNT}개`);
    });
    Console.print(`\n`);
  },

  printAmount(amount) {
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${Number(amount).toLocaleString()}원`);
    Console.print('\n<증정 메뉴>');
    Console.print(amount >= 120000 ? '샴페인 1개' : '없음');
  },

  printBenefit(benefit) {
    Console.print('<혜택 내역>');
    Console.print('<총혜택 금액>');
    Console.print('<할인 후 예상 결제 금액>');
    Console.print('<12월 이벤트 배지>');
  },

  printOutput(output) {
    Console.print(output);
  },
};

export default OutputView;
