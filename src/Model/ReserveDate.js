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
    this.dDayDiscount();
  }

  dDayDiscount() {
    if (this.reserveDate <= 25) {
      const DISCOUNT_AMOUNT = 1000 + (this.reserveDate - 1) * 100;
      return DISCOUNT_AMOUNT;
    }
    return false;
  }
}

export default ReserveDate;
