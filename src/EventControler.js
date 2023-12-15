import Date from './model/Date';
import Menu from './model/Menu';

class EventControler {
  #dateClass;

  #menuClass;

  setDate(date) {
    this.#dateClass = new Date(date);
  }

  getDate() {
    return this.#dateClass.getDate();
  }

  setMenu(menu) {
    this.#menuClass = new Menu(menu);
  }

  getMenu() {
    return this.#menuClass.getMenu();
  }

  getAmountBeforeDiscount() {
    return this.#menuClass.getSumMenuPrice();
  }

  isPresent() {
    const TOTAL_PRICE = this.#menuClass.getSumMenuPrice();
    if (TOTAL_PRICE >= 120_000) return true;
    return false;
  }

  getAmountDDayDiscount() {
    const DATE = this.getDate();
    if (DATE <= 25) {
      return 1000 + 100 * (DATE - 1);
    }
    return 0;
  }
}

export default EventControler;
