const ERROR_MESSAGE = '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';

class Date {
  #date;

  constructor(date) {
    this.#validDate(date);
    this.#date = date;
  }

  #validDate(date) {
    if (Number.isNaN(date)) {
      throw new Error(ERROR_MESSAGE);
    }
    if (date < 1 || date > 31) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  getDate() {
    return this.#date;
  }
}

export default Date;
