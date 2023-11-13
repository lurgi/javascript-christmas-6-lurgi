const WEEKEND = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
const STARDAY = [3, 10, 17, 24, 25, 31];

const ERROR_MESSAGE = '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';

const FIRST_DAY = 1;
const LAST_DAY = 31;
const X_MAS = 25;
const D_DAY_START_MONEY = 1000;
const D_DAY_INC_MONEY = 100;

class ReserveDate {
  constructor(number) {
    this.reserveDate = number;
    this.#validate();
  }

  #validate() {
    if (this.reserveDate < FIRST_DAY || this.reserveDate > LAST_DAY) {
      throw new Error(ERROR_MESSAGE);
    }
    if (Number.isNaN(this.reserveDate)) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  dDayDiscount() {
    if (this.reserveDate <= X_MAS) {
      const DISCOUNT_AMOUNT = D_DAY_START_MONEY + (this.reserveDate - 1) * D_DAY_INC_MONEY;
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
