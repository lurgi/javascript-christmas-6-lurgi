import { APPETIZER, MAIN, DESSERT, DRINK, ERROR_MESSAGE, OTHER_CONSTANT } from './MenuConstant';

class ReserveMenu {
  #appetizer = new Map();

  #main = new Map();

  #dessert = new Map();

  #drink = new Map();

  #totalMenuNumber = 0;

  #menuString;

  #menuNames = [];

  constructor(menuInfo) {
    this.#menuString = menuInfo.map((menuDetail) => menuDetail.split('-'));

    this.#setMenus();

    this.#validDuplicate();
    this.#validOverTwnety();
    this.#validOnlyDrink();
  }

  #setMenus() {
    this.#menuString.forEach(([menuName, menuCount, other]) => {
      this.#validWrongInput(other);
      this.#validExistMenu(menuName);
      this.#validMenuCnt(menuCount);

      this.#setMenu(menuName, menuCount);

      this.#menuNames.push(menuName);
      this.#totalMenuNumber += Number(menuCount);
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
    const COUNT = Number(menuCount);
    if (Number.isNaN(COUNT) || COUNT < OTHER_CONSTANT.minMenuCount) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
  }

  #setMenu(menuName, menuCount) {
    const NUMBER_COUNT = Number(menuCount);
    if (APPETIZER[menuName]) {
      this.#appetizer.set(menuName, NUMBER_COUNT);
    }
    if (MAIN[menuName]) {
      this.#main.set(menuName, NUMBER_COUNT);
    }
    if (DESSERT[menuName]) {
      this.#dessert.set(menuName, NUMBER_COUNT);
    }
    if (DRINK[menuName]) {
      this.#drink.set(menuName, NUMBER_COUNT);
    }
  }

  #validDuplicate() {
    if (this.#menuNames.length !== new Set(this.#menuNames).size) {
      throw new Error(ERROR_MESSAGE.notValid);
    }
  }

  #validOnlyDrink() {
    if (this.#menuNames.length === this.#drink.size) {
      throw new Error(ERROR_MESSAGE.notOnlyDrink);
    }
  }

  #validOverTwnety() {
    if (this.#totalMenuNumber > OTHER_CONSTANT.maxMenuCount) {
      throw new Error(ERROR_MESSAGE.notOver20);
    }
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
