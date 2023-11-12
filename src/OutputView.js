import { Console } from '@woowacourse/mission-utils';

function convertPrintNum(number) {
  return Number(number).toLocaleString();
}

const OutputView = {
  printResult({
    menuInfo,
    amountBeforeDiscount,
    dDayDiscount,
    weekDayOrEnd,
    isStar,
  }) {
    this.printMenu(menuInfo);
    this.printAmount(amountBeforeDiscount);
    this.printBenefit({
      amountBeforeDiscount,
      dDayDiscount,
      weekDayOrEnd,
      isStar,
    });
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
    Console.print(`${convertPrintNum(amount)}원`);
    Console.print('\n<증정 메뉴>');
    Console.print(amount >= 120000 ? '샴페인 1개' : '없음');
  },

  printBenefit({
    amountBeforeDiscount,
    dDayDiscount,
    weekDayOrEnd: { isWeekEnd, weekDiscount },
    isStar,
  }) {
    let benefitAmount = 0;
    benefitAmount -= dDayDiscount;
    benefitAmount -= weekDiscount;
    if (isStar) benefitAmount -= 1000;

    Console.print('\n<혜택 내역>');
    if (!benefitAmount) {
      Console.print('없음');
    } else {
      if (dDayDiscount) {
        Console.print(
          `크리스마스 디데이 할인: -${convertPrintNum(dDayDiscount)}원`,
        );
      }
      const WEEK_STRING = convertPrintNum(weekDiscount);
      if (isWeekEnd) {
        Console.print(`주말 할인: -${WEEK_STRING}원`);
      }
      if (!isWeekEnd) {
        Console.print(`평일 할인: -${WEEK_STRING}원`);
      }
      if (isStar) {
        Console.print(`특별 할인: -1,000원`);
      }
      if (amountBeforeDiscount >= 120000) {
        Console.print(`증정 이벤트: -25,000원`);
      }
    }
    Console.print('\n<총혜택 금액>');
    const BENEFITAMOUNT =
      amountBeforeDiscount >= 120000 ? benefitAmount - 25000 : benefitAmount;
    Console.print(`${convertPrintNum(BENEFITAMOUNT)}원`);
    Console.print('\n<할인 후 예상 결제 금액>');
    Console.print(`${convertPrintNum(amountBeforeDiscount + benefitAmount)}원`);
    Console.print('\n<12월 이벤트 배지>');
    if (BENEFITAMOUNT <= -20000) {
      Console.print(`산타`);
    } else if (BENEFITAMOUNT <= 10000) {
      Console.print('트리');
    } else if (BENEFITAMOUNT <= 5000) {
      Console.print('별');
    } else {
      Console.print('없음');
    }
  },

  printOutput(output) {
    Console.print(output);
  },
};

export default OutputView;
