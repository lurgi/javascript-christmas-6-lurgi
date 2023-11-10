import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printResult() {
    this.printMenu();
    this.printAmount();
    this.printPresent();
    this.printBenefit();
    this.printBenefitAmount();
    this.printExpectAmount();
    this.printBadge();
  },

  printMenu(menu) {
    Console.print('<주문 메뉴>');
  },

  printAmount(amount) {
    Console.print('<할인 전 총주문 금액>');
  },

  printPresent(present) {
    Console.print('<증정 메뉴>');
  },

  printBenefit(benefit) {
    Console.print('<혜택 내역>');
  },

  printBenefitAmount(benefitAmount) {
    Console.print('<총혜택 금액>');
  },

  printExpectAmount(expectAmount) {
    Console.print('<할인 후 예상 결제 금액>');
  },

  printBadge(Badge) {
    Console.print('<12월 이벤트 배지>');
  },
};

export default OutputView;
