import Date from './model/Date';

class EventControler {
  #dateClass;

  setDate(date) {
    this.#dateClass = new Date(date);
  }
}

export default EventControler;
