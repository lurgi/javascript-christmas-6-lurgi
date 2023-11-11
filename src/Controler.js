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
    let starDiscount = 0;
    if (isStar) starDiscount = 1000;

    return {
      amountBeforeDiscount: AMOUNT_BEFORE_DISCOUNT;
      menuInfo: this.reserveMenu.getMenuInfo(),
      dDayDiscount,
      weekDayOrEnd: { isWeekEnd, weekDiscount },
      starDiscount,
    };
  }
}

export default Controler;
