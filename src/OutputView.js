import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES, OUTPUT_LIST, OUTPUT_PRICE, OUTPUT_RESULT } from './OutputConstant';

const OutputInfo = {};

const OutputView = Object.freeze({
  printResult(PrintInfo) {
    this.setPrintInfo(PrintInfo);

    Console.print(OUTPUT_MESSAGES.previewEvent(OutputInfo.reserveDate));

    this.printMenu(OutputInfo.menuInfo);
    this.printAmount(OutputInfo.amountBeforeDiscount);
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
    OutputInfo.menuInfo = menuInfo;
    OutputInfo.amountBeforeDiscount = amountBeforeDiscount;
    OutputInfo.dDayDiscount = dDayDiscount;
    OutputInfo.weekDayOrEnd = weekDayOrEnd;
    OutputInfo.isStar = isStar;
    OutputInfo.reserveDate = reserveDate;
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
    benefitAmount -= OutputInfo.dDayDiscount;
    benefitAmount -= OutputInfo.weekDayOrEnd.weekDiscount;
    if (OutputInfo.isStar) benefitAmount -= OUTPUT_PRICE.special;
    OutputInfo.benefitAmount = benefitAmount;
  },

  printBenefitDetail() {
    Console.print(OUTPUT_MESSAGES.benefit);

    if (!OutputInfo.benefitAmount) {
      Console.print(OUTPUT_RESULT.nothing);

      return;
    }

    this.printBenefitDDay();
    this.printBenefitDetailWeek();
    this.printBenefitSpecial();
    this.printBenefitPresent();
  },

  printBenefitDDay() {
    if (OutputInfo.dDayDiscount) {
      Console.print(`${OUTPUT_LIST.dDay} ${OUTPUT_RESULT.negativeAmount(OutputInfo.dDayDiscount)}`);
    }
  },

  printBenefitDetailWeek() {
    const { isWeekEnd, weekDiscount } = OutputInfo.weekDayOrEnd;
    if (weekDiscount) {
      Console.print(
        `${OUTPUT_LIST.weekDayOrEnd(isWeekEnd)} ${OUTPUT_RESULT.negativeAmount(weekDiscount)}`,
      );
    }
  },

  printBenefitSpecial() {
    if (OutputInfo.isStar) {
      Console.print(`${OUTPUT_LIST.special} ${OUTPUT_RESULT.negativeAmount(OUTPUT_PRICE.special)}`);
    }
  },

  printBenefitPresent() {
    if (OutputInfo.amountBeforeDiscount >= OUTPUT_PRICE.presentBaseAmount) {
      Console.print(`${OUTPUT_LIST.present} ${OUTPUT_RESULT.negativeAmount(OUTPUT_PRICE.present)}`);
    }
  },

  printPayAmount() {
    Console.print(OUTPUT_MESSAGES.totalBenefitAmount);
    const TOTAL_BENEFIT_AMOUNT = this.getTotalBenefitAmount();
    Console.print(OUTPUT_RESULT.amount(TOTAL_BENEFIT_AMOUNT));

    Console.print(OUTPUT_MESSAGES.payAmount);
    const PAY_AMOUNT = OutputInfo.amountBeforeDiscount + OutputInfo.benefitAmount;
    Console.print(OUTPUT_RESULT.amount(PAY_AMOUNT));

    this.printBadge(TOTAL_BENEFIT_AMOUNT);
  },

  getTotalBenefitAmount() {
    const IS_PRESENT = OutputInfo.amountBeforeDiscount >= OUTPUT_PRICE.presentBaseAmount;

    if (IS_PRESENT) {
      return OutputInfo.benefitAmount - OUTPUT_PRICE.present;
    }

    return OutputInfo.benefitAmount;
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
});

export default OutputView;
