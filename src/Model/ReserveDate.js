const WEEKEND = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
const STARDAY = [3, 10, 17, 24, 25, 31];

class ReserveDate {
  constructor(number) {
    this.validate(number);
    this.reserveDate = number;
  }

  validate(number) {
    if (number < 1 || number > 31) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    if (Number.isNaN(number)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  applyDateDiscount() {
    const D_DAY = this.dDayDiscount();
    const IS_WEEKEND = this.isWeekEnd();
    const IS_STAR = this.isStarDay();
    return { dDayDiscount: D_DAY, isWeekEnd: IS_WEEKEND, isStar: IS_STAR };
  }

  dDayDiscount() {
    if (this.reserveDate <= 25) {
      const DISCOUNT_AMOUNT = 1000 + (this.reserveDate - 1) * 100;
      return DISCOUNT_AMOUNT;
    }
    return 0;
  }

  isWeekEnd() {
    return WEEKEND.includes(this.reserveDate);
  }

  isStarDay() {
    return STARDAY.includes(this.reserveDate);
  }
}

export default ReserveDate;
