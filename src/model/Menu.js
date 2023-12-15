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
      throw new Error('[ERROR] 메뉴 없음');
    }
    if (Number.isNaN(NUM)) {
      throw new Error('[ERROR] 메뉴 수량 숫자 아님');
    }
    if (NUM < 1) {
      throw new Error('[ERROR] 메뉴 수량 1 미만');
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
      throw new Error('[ERROR] 메뉴 중복');
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
      throw new Error('[ERROR] 메뉴 20개 초과');
    }
  }

  #validOnlyDrink() {
    if (
      !this.#appitizer.size &&
      !this.#main.size &&
      !this.#dessert.size &&
      this.#drink.size
    ) {
      throw new Error('[ERROR] 음료만 주문 불가');
    }
  }

  //   #validPriceOver10000() {
  //     const TOTAL_PRICE = this.#getSumMenuPrice;
  //     if (TOTAL_PRICE < 10000) {
  //       throw new Error('[ERROR] 가격 1만원 미만');
  //     }
  //   }

  //   #getSumMenuPrice() {
  //     const APPITIZER_PRICE = this.#getEachMenuPrice(this.#appitizer, APPITIZER);
  //     const MAIN_PRICE = this.#getEachMenuPrice(this.#main, MAIN);
  //     const DESSERT_PRICE = this.#getEachMenuPrice(this.#dessert, DESSERT);
  //     const DRINK_PRICE = this.#getEachMenuPrice(this.#drink, DRINK);
  //     return APPITIZER_PRICE + MAIN_PRICE + DESSERT_PRICE + DRINK_PRICE;
  //   }

  //   #getEachMenuPrice(hashMap, constant) {
  //     const KEYS = hashMap.keys();
  //     let sum = 0;
  //     KEYS.forEach((menu) => {
  //       sum += constant[menu] * this.#appitizer[menu];
  //     });
  //     return sum;
  //   }
}

export default Menu;
