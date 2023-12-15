import Date from './model/Date';
import Menu from './model/Menu';

const WEEK_END = Object.freeze([1, 2, 8, 9, 15, 16, 22, 23, 29, 30]);
const SPECIAL_DAY = Object.freeze([3, 10, 17, 24, 25, 31]);

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

  getUnder10000() {
    const TOTAL_PRICE = this.#menuClass.getSumMenuPrice();
    if (TOTAL_PRICE < 10_000) return true;
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

  getIsSpecial() {
    const DATE = this.getDate();
    return SPECIAL_DAY.includes(DATE);
  }

  getTotalBenefitAmount() {
    let totalAmount = 0;

    const D_DAY_DISCOUNT = this.getAmountDDayDiscount();
    if (D_DAY_DISCOUNT) totalAmount -= D_DAY_DISCOUNT;

    const WEEK_DISCOUNT = this.getWeekDiscount();
    if (WEEK_DISCOUNT) totalAmount -= WEEK_DISCOUNT;

    if (this.getIsSpecial()) totalAmount -= 1_000;
    if (this.getIsPresent()) totalAmount -= 25_000;

    return totalAmount;
  }
}

export default EventControler;
