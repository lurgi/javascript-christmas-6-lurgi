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
    menu.forEach((value) => {
      const [NAME, CNT] = value.split('-');
      this.#validMenuDetail(NAME, CNT);
      this.#validDuplication(NAME);
      this.#setMenu(NAME, CNT);
    });
  }

  #validMenuDetail(NAME, CNT) {
    if (!this.#isValidMenu(NAME)) {
      throw new Error('[ERROR] 메뉴 없음');
    }
    if (Number.isNaN(Number(CNT))) {
      throw new Error('[ERROR] 메뉴 수량 숫자 아님');
    }
    if (Number(CNT) < 1) {
      throw new Error('[ERROR] 메뉴 수량 1 미만');
    }
  }

  #isValidMenu(name) {
    return Boolean(
      APPITIZER[name] || MAIN[name] || DESSERT[name] || DESSERT[name],
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
}

export default Menu;
