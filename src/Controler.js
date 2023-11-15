const DISCOUNT_BASE_AMOUNT = 10000;

class Controler {
  #reserveDate;

  #reserveMenu;

  setReserveDate(dateClass) {
    this.#reserveDate = dateClass;
  }

  setReserveMenu(menuClass) {
    this.#reserveMenu = menuClass;
  }

  getPrintInfo() {
    const AMOUNT_BEFORE_DISCOUNT = this.#reserveMenu.getAmount();
    const RESERVE_DATE = this.#reserveDate.getReserveDate();
    const MENU_INFO = this.#reserveMenu.getMenuInfo();
    const { dDayDiscount, weekDayOrEnd, isStar } = this.#getDiscountInfo(AMOUNT_BEFORE_DISCOUNT);

    return {
      menuInfo: MENU_INFO,
      amountBeforeDiscount: AMOUNT_BEFORE_DISCOUNT,
      dDayDiscount,
      weekDayOrEnd,
      isStar,
      reserveDate: RESERVE_DATE,
    };
  }

  #getDiscountInfo(AMOUNT_BEFORE_DISCOUNT) {
    const isValidDiscount = AMOUNT_BEFORE_DISCOUNT >= DISCOUNT_BASE_AMOUNT;
    const D_DAY_DISCOUNT = isValidDiscount ? this.#reserveDate.dDayDiscount() : 0;
    const [IS_WEEKEND, WEEK_DISCOUNT] = this.#getWeekDiscount();
    const IS_STAR = isValidDiscount && this.#reserveDate.isStarDay();

    return {
      dDayDiscount: D_DAY_DISCOUNT,
      weekDayOrEnd: { isWeekEnd: IS_WEEKEND, weekDiscount: isValidDiscount ? WEEK_DISCOUNT : 0 },
      isStar: IS_STAR,
    };
  }

  #getWeekDiscount() {
    const IS_WEEKEND = this.#reserveDate.isWeekEnd();
    let weekDiscount = 0;

    if (IS_WEEKEND) {
      weekDiscount = this.#reserveMenu.applyWeekEndDiscount();
    }
    if (!IS_WEEKEND) {
      weekDiscount = this.#reserveMenu.applyWeekDayDiscount();
    }

    return [IS_WEEKEND, weekDiscount];
  }
}

export default Controler;
