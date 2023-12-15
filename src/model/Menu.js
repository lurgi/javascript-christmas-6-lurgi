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
  #menu;

  constructor(menu) {
    const MENU = menu.map((value) => {
      const [NAME, CNT] = value.split('-');
      this.#validMenuDetail(NAME, CNT);
    });
    // this.#validMenuWhole(MENU);
    this.#menu = MENU;
  }

  //   #validMenuWhole(menu) {
  //     // TODO 중복 확인
  //     this.#validDuplication(menu);
  //   }

  #validMenuDetail(NAME, CNT) {
    if (!this.#isValidMenu(NAME)) {
      throw new Error('[ERROR] 메뉴 없음');
    }
  }

  #isValidMenu(name) {
    return Boolean(
      APPITIZER[name] || MAIN[name] || DESSERT[name] || DESSERT[name],
    );
  }

  #validDuplication(menu) {
    if (menu.length !== new Set(menu).size) {
      throw new Error('[ERROR 메뉴 중복');
    }
  }
}

export default Menu;
