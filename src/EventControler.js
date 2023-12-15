import Date from './model/Date';
import Menu from './model/Menu';

class EventControler {
  #dateClass;

  #menuClass;

  setDate(date) {
    this.#dateClass = new Date(date);
  }

  setMenu(menu) {
    this.#menuClass = new Menu(menu);
  }
}

export default EventControler;
