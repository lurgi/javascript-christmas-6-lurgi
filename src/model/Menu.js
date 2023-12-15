const APPITIZER = {
  양송이수프: 6_000,
  타파스: 5_500,
  시저샐러드: 8_000,
};

const MAIN = {
  티본스테이크: 55_000,
  바비큐립: 54_000,
  해산물파스타: 35_000,
  크리스마스파스타: 25_000,
};

const DESSERT = {
  초코케이크: 15_000,
  아이스크림: 5_000,
};

const DRINK = {
  제로콜라: 3_000,
  레드와인: 60_000,
  샴페인: 25_000,
};

const ERROR_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

class Menu {
  #appitizer = new Map();

  #main = new Map();

  #dessert = new Map();

  #drink = new Map();

  constructor(menu) {
    let number = 0;
    menu.forEach((value) => {
      const [NAME, CNT] = value.split('-');
      const CNT_NUM = Number(CNT);
      const NAME_STR = NAME.trim();
      number += CNT_NUM;

      this.#validMenuDetail(NAME_STR, CNT_NUM);
      this.#validDuplication(NAME_STR);
      this.#setMenu(NAME_STR, CNT_NUM);
    });
    this.#validOver20(number);
    this.#validOnlyDrink();
  }

  #validMenuDetail(NAME, NUM) {
    if (!this.#isValidMenu(NAME)) {
      throw new Error(ERROR_MESSAGE);
    }
    if (Number.isNaN(NUM)) {
      throw new Error(ERROR_MESSAGE);
    }
    if (NUM < 1) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  #isValidMenu(name) {
    return Boolean(
      APPITIZER[name] || MAIN[name] || DESSERT[name] || DRINK[name],
    );
  }

  #validDuplication(name) {
    if (
      this.#appitizer.get(name) ||
      this.#main.get(name) ||
      this.#dessert.get(name) ||
      this.#drink.get(name)
    ) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  #setMenu(name, cnt) {
    if (APPITIZER[name]) this.#appitizer.set(name, cnt);
    if (MAIN[name]) this.#main.set(name, cnt);
    if (DESSERT[name]) this.#dessert.set(name, cnt);
    if (DRINK[name]) this.#drink.set(name, cnt);
  }

  #validOver20(number) {
    if (number > 20) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  #validOnlyDrink() {
    if (
      !this.#appitizer.size &&
      !this.#main.size &&
      !this.#dessert.size &&
      this.#drink.size
    ) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  getMenu() {
    const RETURN_ARR = [];
    this.#assignMenu(this.#appitizer, RETURN_ARR);
    this.#assignMenu(this.#main, RETURN_ARR);
    this.#assignMenu(this.#dessert, RETURN_ARR);
    this.#assignMenu(this.#drink, RETURN_ARR);
    return RETURN_ARR;
  }

  #assignMenu(hashMap, arr) {
    const KEYS = Array.from(hashMap.keys());
    KEYS.forEach((name) => {
      arr.push([name, hashMap.get(name)]);
    });
  }

  getSumMenuPrice() {
    const APPITIZER_PRICE = this.#getEachMenuPrice(this.#appitizer, APPITIZER);
    const MAIN_PRICE = this.#getEachMenuPrice(this.#main, MAIN);
    const DESSERT_PRICE = this.#getEachMenuPrice(this.#dessert, DESSERT);
    const DRINK_PRICE = this.#getEachMenuPrice(this.#drink, DRINK);
    return APPITIZER_PRICE + MAIN_PRICE + DESSERT_PRICE + DRINK_PRICE;
  }

  #getEachMenuPrice(hashMap, constant) {
    const KEYS = Array.from(hashMap.keys());
    return KEYS.reduce((acc, menu) => {
      let sum = acc;
      sum += constant[menu] * hashMap.get(menu);
      return sum;
    }, 0);
  }

  getWeekDiscount(isWeekend) {
    if (isWeekend) {
      return (
        Array.from(this.#main.values()).reduce((acc, num) => acc + num, 0) *
        2023
      );
    }
    if (!isWeekend) {
      return (
        Array.from(this.#dessert.values()).reduce((acc, num) => acc + num, 0) *
        2023
      );
    }
  }
}

export default Menu;
