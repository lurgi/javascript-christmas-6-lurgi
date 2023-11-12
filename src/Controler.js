class Controler {
  setReserveDate(dateClass) {
    this.reserveDate = dateClass;
  }

  setReserveMenu(menuClass) {
    this.reserveMenu = menuClass;
  }

  getPrintInfo() {
    const AMOUNT_BEFORE_DISCOUNT = this.reserveMenu.getAmount();
    const D_DAY_DISCOUNT = this.reserveDate.dDayDiscount();
    const [IS_WEEKEND, WEEK_DISCOUNT] = this.#getWeekDiscount();
    const IS_STAR = this.reserveDate.isStarDay();
    const MENU_INFO = this.reserveMenu.getMenuInfo();

    return {
      menuInfo: MENU_INFO,
      amountBeforeDiscount: AMOUNT_BEFORE_DISCOUNT,
      dDayDiscount: D_DAY_DISCOUNT,
      weekDayOrEnd: { isWeekEnd: IS_WEEKEND, weekDiscount: WEEK_DISCOUNT },
      isStar: IS_STAR,
    };
  }

  #getWeekDiscount() {
    const IS_WEEKEND = this.reserveDate.isWeekEnd();

    let weekDiscount = 0;
    if (IS_WEEKEND) {
      weekDiscount = this.reserveMenu.applyWeekEndDiscount();
    }
    if (!IS_WEEKEND) {
      weekDiscount = this.reserveMenu.applyWeekDayDiscount();
    }

    return [IS_WEEKEND, weekDiscount];
  }
}

export default Controler;
