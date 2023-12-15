import Date from './model/Date';
import Menu from './model/Menu';

const WEEK_END = Object.freeze([1, 2, 8, 9, 15, 16, 22, 23, 29, 30]);

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

  getIsPresent() {
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

  getIsWeekend() {
    const DATE = this.getDate();
    return WEEK_END.includes(DATE);
  }

  getWeekDiscount() {
    const IS_WEEKEND = this.getIsWeekend();
    return this.#menuClass.getWeekDiscount(IS_WEEKEND);
  }
}

export default EventControler;
