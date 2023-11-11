class Controler {
  setReserveDate(dateClass) {
    this.reserveDate = dateClass;
  }

  setReserveMenu(menuClass) {
    this.reserveMenu = menuClass;
  }

  getPrintInfo() {
    this.#applyDiscount();
  }

  #applyDiscount() {
    const AMOUNT_BEFORE_DISCOUNT = this.reserveMenu.getAmount();
    const { dDayDiscount, isWeekEnd, isStar } =
      this.reserveDate.applyDateDiscount();
    let weekDayDiscount = 0;
    let weekEndDiscount = 0;
    if (isWeekEnd) {
      weekEndDiscount = this.reserveMenu.applyWeekEndDiscount();
    }
    if (!isWeekEnd) {
      weekDayDiscount = this.reserveMenu.applyWeekDayDiscount();
    }
    let starDiscount = 0;
    if (isStar) starDiscount = 1000;
  }
}

export default Controler;
