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

  applyDateDiscount() {}
}

export default ReserveDate;
