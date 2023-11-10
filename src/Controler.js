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
    this.reserveDate.applyDateDiscount();
    this.reserveMenu.applyMenuDiscount();
  }
}

export default Controler;
