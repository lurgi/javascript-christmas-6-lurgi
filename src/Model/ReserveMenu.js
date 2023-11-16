import { APPETIZER, MAIN, DESSERT, DRINK, ERROR_MESSAGE, OTHER_CONSTANT } from './MenuConstant';

class ReserveMenu {
  #appetizer = new Map();

  #main = new Map();

  #dessert = new Map();

  #drink = new Map();

  constructor(menuInfo) {
    const MENU_STRING = menuInfo.map((menuDetail) => menuDetail.split(OTHER_CONSTANT.divideSymbol));

    this.#setMenus(MENU_STRING);

    this.#validOverTwnety();
    this.#validOnlyDrink();
  }

  #setMenus(menuString) {
    menuString.forEach(([menuName, menuCount, other]) => {
      this.#validWrongInput(other);
      this.#validExistMenu(menuName);
      this.#validMenuCnt(menuCount);
      this.#validDuplicate(menuName);

      this.#setMenu(menuName, menuCount);
    });
  }

  #validWrongInput(other) {
    if (other) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
  }

  #validExistMenu(menuName) {
    if (!APPETIZER[menuName] && !MAIN[menuName] && !DESSERT[menuName] && !DRINK[menuName]) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
  }

  #validMenuCnt(menuCount) {
    if (Number.isNaN(Number(menuCount)) || Number(menuCount) < OTHER_CONSTANT.minMenuCount) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
  }

  #validDuplicate(menuName) {
    if (this.#appetizer.get(menuName)) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
    if (this.#main.get(menuName)) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
    if (this.#dessert.get(menuName)) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
    if (this.#drink.get(menuName)) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
  }

  #setMenu(menuName, menuCount) {
    if (APPETIZER[menuName]) {
      this.#appetizer.set(menuName, Number(menuCount));
    }
    if (MAIN[menuName]) {
      this.#main.set(menuName, Number(menuCount));
    }
    if (DESSERT[menuName]) {
      this.#dessert.set(menuName, Number(menuCount));
    }
    if (DRINK[menuName]) {
      this.#drink.set(menuName, Number(menuCount));
    }
  }

  #validOnlyDrink() {
    if (this.#getSortOfMenu() === this.#drink.size) {
      throw new Error(ERROR_MESSAGE.notOnlyDrink);
    }
  }

  #getSortOfMenu() {
    return this.#appetizer.size + this.#main.size + this.#dessert.size + this.#drink.size;
  }

  #validOverTwnety() {
    if (this.#getTotalMenuNumber() > OTHER_CONSTANT.maxMenuCount) {
      throw new Error(ERROR_MESSAGE.notOver20);
    }
  }

  #getTotalMenuNumber() {
    return [
      ...this.#appetizer.values(),
      ...this.#main.values(),
      ...this.#dessert.values(),
      ...this.#drink.values(),
    ].reduce((acc, cur) => acc + cur, 0);
  }

  applyWeekDayDiscount() {
    let discountAmount = 0;

    [...this.#dessert.keys()].forEach((name) => {
      const CNT = this.#dessert.get(name);
      discountAmount += CNT * OTHER_CONSTANT.weekDiscountRange;
    });

    return discountAmount;
  }

  applyWeekEndDiscount() {
    let discountAmount = 0;

    [...this.#main.keys()].forEach((name) => {
      const CNT = this.#main.get(name);
      discountAmount += CNT * OTHER_CONSTANT.weekDiscountRange;
    });

    return discountAmount;
  }

  getAmount() {
    let amount = 0;

    amount += this.#loofMenuAmount(this.#appetizer, APPETIZER);
    amount += this.#loofMenuAmount(this.#main, MAIN);
    amount += this.#loofMenuAmount(this.#dessert, DESSERT);
    amount += this.#loofMenuAmount(this.#drink, DRINK);

    return amount;
  }

  #loofMenuAmount(hashMap, menuConst) {
    let amount = 0;

    [...hashMap.keys()].forEach((name) => {
      amount += menuConst[name] * hashMap.get(name);
    });

    return amount;
  }

  getMenuInfo() {
    this.menuInfo = {};

    this.#loofMenuInfo(this.#appetizer);
    this.#loofMenuInfo(this.#main);
    this.#loofMenuInfo(this.#dessert);
    this.#loofMenuInfo(this.#drink);

    return this.menuInfo;
  }

  #loofMenuInfo(hashMap) {
    [...hashMap.keys()].forEach((name) => {
      const CNT = hashMap.get(name);
      this.menuInfo[name] = CNT;
    });
  }
}

export default ReserveMenu;
