class Controler {
  #reserveDate;

  #reserveMenu;

  constructor(reserveDate, reserveMenu) {
    this.#reserveDate = reserveDate;
    this.#reserveMenu = reserveMenu;
  }

  getPrintInfo() {
    this.#applyDiscount();
  }

  #applyDiscount() {
    this.#reserveDate.applyDateDiscount();
    this.#reserveMenu.applyMenuDiscount();
  }
}

export default Controler;
