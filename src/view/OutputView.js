import { Console } from '@woowacourse/mission-utils';

const OUTPUT_TITLE = {
  menuTitle: '\n<주문 메뉴>',
  amountBeforeDiscountTitle: '\n<할인 전 총주문 금액>',
  presentTitle: '\n<증정 메뉴>',
  benefitTitle: '\n<혜택 내역>',
  totalBenefitAmountTitle: '\n<총혜택 금액>',
  amountAfterDiscountTitle: '\n<할인 후 예상 결제 금액>',
  badgeTitle: '\n<12월 이벤트 배지>',
};

const OUTPUTS = {
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  nothing: '없음',
  dateString: (date) =>
    `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  menuString: (name, cnt) => `${name} ${cnt}개`,
  amountBeforeDiscountString: (amount) => `${amount.toLocaleString()}원`,
  presentString: (bol) => (bol ? '샴페인 1개' : '없음'),
  dDayAmount: (amount) =>
    `크리스마스 디데이 할인: -${amount.toLocaleString()}원`,
  weekDiscount: (isWeekend, amount) =>
    `${isWeekend ? '주말' : '평일'} 할인: -${amount.toLocaleString()}원`,
  sepcial: '특별 할인: -1,000원',
  presentAmount: `증정 이벤트: -25,000원`,
  amountString: (amount) => `${amount.toLocaleString()}원`,
  badge: (amount) => {
    if (amount <= -20_000) {
      return '산타';
    }
    if (amount <= -10_000) {
      return '트리';
    }
    if (amount <= -5_000) {
      return '별';
    }
  },
};

const OutputView = {
  printStart() {
    this.print(OUTPUTS.start);
  },

  printDateString(date) {
    this.print(OUTPUTS.dateString(date));
  },

  printMenu(menu) {
    this.print(OUTPUT_TITLE.menuTitle);
    menu.forEach(([name, cnt]) => {
      this.print(OUTPUTS.menuString(name, cnt));
    });
  },

  printAMountBeforeDiscount(amount) {
    this.print(OUTPUT_TITLE.amountBeforeDiscountTitle);
    this.print(OUTPUTS.amountBeforeDiscountString(amount));
  },

  printPresent(bol) {
    this.print(OUTPUT_TITLE.presentTitle);
    this.print(OUTPUTS.presentString(bol));
  },

  printBenefitStart() {
    this.print(OUTPUT_TITLE.benefitTitle);
  },

  printDDayBenefit(amount) {
    if (amount) this.print(OUTPUTS.dDayAmount(amount));
  },

  printWeekBenefit(isWeekend, amount) {
    this.print(OUTPUTS.weekDiscount(isWeekend, amount));
  },

  printNothing() {
    this.print(OUTPUTS.nothing);
  },

  printSpecial(isSpecial) {
    if (isSpecial) {
      this.print(OUTPUTS.sepcial);
    }
  },

  printPresentBenefit(isPresent) {
    if (isPresent) {
      this.print(OUTPUTS.presentAmount);
    }
  },

  printTotalBenefitAmount(amount) {
    this.print(OUTPUT_TITLE.totalBenefitAmountTitle);
    this.print(OUTPUTS.amountString(amount));
  },

  printAmountAfterDiscount(amount) {
    this.print(OUTPUT_TITLE.amountAfterDiscountTitle);
    this.print(OUTPUTS.amountString(amount));
  },

  printBadge(amount) {
    this.print(OUTPUT_TITLE.badgeTitle);
    this.print(OUTPUTS.badge(amount));
  },

  print(string) {
    Console.print(string);
  },
};

export default OutputView;
