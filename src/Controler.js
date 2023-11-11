class Controler {
  setReserveDate(dateClass) {
    this.reserveDate = dateClass;
  }

  setReserveMenu(menuClass) {
    this.reserveMenu = menuClass;
  }

  getPrintInfo() {
    const PrintInfo = this.#applyDiscount();
    return PrintInfo;
  }

  #applyDiscount() {
    const AMOUNT_BEFORE_DISCOUNT = this.reserveMenu.getAmount();
    const { dDayDiscount, isWeekEnd, isStar } =
      this.reserveDate.applyDateDiscount();
    let weekDiscount = 0;
    if (isWeekEnd) {
      weekDiscount = this.reserveMenu.applyWeekEndDiscount();
    }
    if (!isWeekEnd) {
      weekDiscount = this.reserveMenu.applyWeekDayDiscount();
    }

    return {
      menuInfo: this.reserveMenu.getMenuInfo(),
      amountBeforeDiscount: AMOUNT_BEFORE_DISCOUNT,
      dDayDiscount,
      weekDayOrEnd: { isWeekEnd, weekDiscount },
      isStar,
    };
  }
}

export default Controler;
