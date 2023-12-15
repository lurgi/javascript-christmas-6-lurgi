class Date {
  #date;

  constructor(date) {
    this.#validDate(date);
    this.#date = date;
  }

  #validDate(date) {
    if (Number.isNaN(date)) {
      throw new Error('[ERROR] 숫자 아님');
    }
    if (date < 1 || date > 31) {
      throw new Error('[ERROR] 1~31 숫자만 입력');
    }
  }

  getDate() {
    return this.#date;
  }
}

export default Date;
