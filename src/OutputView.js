import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES, OUTPUT_LIST, OUTPUT_PRICE, OUTPUT_RESULT } from './OutputConstant';

const OutputView = {
  printResult(PrintInfo) {
    this.setPrintInfo(PrintInfo);

    Console.print(OUTPUT_MESSAGES.previewEvent(this.reserveDate));

    this.printMenu(this.menuInfo);
    this.printAmount(this.amountBeforeDiscount);
    this.printBenefit();
  },

  setPrintInfo({
    menuInfo,
    amountBeforeDiscount,
    dDayDiscount,
    weekDayOrEnd,
    isStar,
    reserveDate,
  }) {
    this.menuInfo = menuInfo;
    this.amountBeforeDiscount = amountBeforeDiscount;
    this.dDayDiscount = dDayDiscount;
    this.weekDayOrEnd = weekDayOrEnd;
    this.isStar = isStar;
    this.reserveDate = reserveDate;
  },

  printMenu(menu) {
    Console.print(OUTPUT_MESSAGES.orderMenu);

    Object.keys(menu).forEach((name) => {
      const CNT = menu[name];
      Console.print(OUTPUT_RESULT.orderMenuDetail(name, CNT));
    });
  },

  printAmount(amount) {
    Console.print(OUTPUT_MESSAGES.beforeDiscount);
    Console.print(OUTPUT_RESULT.amount(amount));
    Console.print(OUTPUT_MESSAGES.present);
    Console.print(OUTPUT_RESULT.present(amount));
  },

  printBenefit() {
    this.setBenefitAmount();
    this.printBenefitDetail();
    this.printPayAmount();
  },

  setBenefitAmount() {
    let benefitAmount = 0;
    benefitAmount -= this.dDayDiscount;
    benefitAmount -= this.weekDayOrEnd.weekDiscount;
    if (this.isStar) benefitAmount -= OUTPUT_PRICE.special;
    this.benefitAmount = benefitAmount;
  },

  printBenefitDetail() {
    Console.print(OUTPUT_MESSAGES.benefit);

    if (!this.benefitAmount) {
      Console.print(OUTPUT_RESULT.nothing);

      return;
    }

    this.printBenefitDDay();
    this.printBenefitDetailWeek();
    this.printBenefitSpecial();
    this.printBenefitPresent();
  },

  printBenefitDDay() {
    if (this.dDayDiscount) {
      Console.print(`${OUTPUT_LIST.dDay} ${OUTPUT_RESULT.negativeAmount(this.dDayDiscount)}`);
    }
  },

  printBenefitDetailWeek() {
    const { isWeekEnd, weekDiscount } = this.weekDayOrEnd;
    Console.print(
      `${OUTPUT_LIST.weekDayOrEnd(isWeekEnd)} ${OUTPUT_RESULT.negativeAmount(weekDiscount)}`,
    );
  },

  printBenefitSpecial() {
    if (this.isStar) {
      Console.print(`${OUTPUT_LIST.special} ${OUTPUT_RESULT.negativeAmount(OUTPUT_PRICE.special)}`);
    }
  },

  printBenefitPresent() {
    if (this.amountBeforeDiscount >= OUTPUT_PRICE.presentBaseAmount) {
      Console.print(`${OUTPUT_LIST.present} ${OUTPUT_RESULT.negativeAmount(OUTPUT_PRICE.present)}`);
    }
  },

  printPayAmount() {
    Console.print(OUTPUT_MESSAGES.totalBenefitAmount);
    const TOTAL_BENEFIT_AMOUNT = this.getTotalBenefitAmount();
    Console.print(OUTPUT_RESULT.amount(TOTAL_BENEFIT_AMOUNT));

    Console.print(OUTPUT_MESSAGES.payAmount);
    const PAY_AMOUNT = this.amountBeforeDiscount + this.benefitAmount;
    Console.print(OUTPUT_RESULT.amount(PAY_AMOUNT));

    this.printBadge(TOTAL_BENEFIT_AMOUNT);
  },

  getTotalBenefitAmount() {
    const IS_PRESENT = this.amountBeforeDiscount >= OUTPUT_PRICE.presentBaseAmount;

    if (IS_PRESENT) {
      return this.benefitAmount - OUTPUT_PRICE.present;
    }

    return this.benefitAmount;
  },

  printBadge(BENEFITAMOUNT) {
    Console.print(OUTPUT_MESSAGES.badge);

    if (BENEFITAMOUNT <= OUTPUT_PRICE.santaBadgeBaseAmount) {
      Console.print(OUTPUT_RESULT.badgeSanta);
    } else if (BENEFITAMOUNT <= OUTPUT_PRICE.treeBadgeBaseAmount) {
      Console.print(OUTPUT_RESULT.badgeTree);
    } else if (BENEFITAMOUNT <= OUTPUT_PRICE.starBadgeBaseAmount) {
      Console.print(OUTPUT_RESULT.badgeStar);
    } else {
      Console.print(OUTPUT_RESULT.nothing);
    }
  },

  printOutput(output) {
    Console.print(output);
  },
};

export default OutputView;
