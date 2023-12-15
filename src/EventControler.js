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
}

export default EventControler;
