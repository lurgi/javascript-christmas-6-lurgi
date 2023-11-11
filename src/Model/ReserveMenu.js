const APPETIZER = Object.freeze({
  양송이수프: 6000,
  타파스: 5500,
  시저샐러드: 8000,
});

const MAIN = Object.freeze({
  티본스테이크: 55000,
  바비큐립: 54000,
  해산물파스타: 35000,
  크리스마스파스타: 25000,
});

const DESSERT = Object.freeze({
  초코케이크: 15000,
  아이스크림: 5000,
});

const DRINK = Object.freeze({
  제로콜라: 3000,
  레드와인: 60000,
  샴페인: 25000,
});

class ReserveMenu {
  appetizer = new Map();

  main = new Map();

  dessert = new Map();

  drink = new Map();

  totalMenuNumber = 0;

  constructor(menuInfo) {
    const MENU_DETAIL = menuInfo.map((menuDetail) => menuDetail.split('-'));
    const MENU_NAMES = MENU_DETAIL.map(([menuName]) => menuName);
    this.totalMenuNumber = MENU_NAMES.length;

    if (MENU_NAMES.length !== new Set(MENU_NAMES).size) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }

    MENU_DETAIL.forEach(([menuName, menuCount, other]) => {
      if (other) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
      this.validateMenu(menuName, menuCount);
      if (APPETIZER[menuName]) {
        this.appetizer.set(menuName, Number(menuCount));
      }
      if (MAIN[menuName]) {
        this.main.set(menuName, Number(menuCount));
      }
      if (DESSERT[menuName]) {
        this.dessert.set(menuName, Number(menuCount));
      }
      if (DRINK[menuName]) {
        this.drink.set(menuName, Number(menuCount));
      }
    });
    this.validOnlyDrink();
  }

  validateMenu(menuName, menuCount) {
    if (
      !APPETIZER[menuName] &&
      !MAIN[menuName] &&
      !DESSERT[menuName] &&
      !DRINK[menuName]
    ) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    const COUNT = Number(menuCount);
    if (Number.isNaN(COUNT) || COUNT < 1) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  validOnlyDrink() {
    if (this.totalMenuNumber === this.drink.size) {
      throw new Error(
        '"[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요."',
      );
    }
  }

  getAmountBeforeDiscount() {
    let amount = 0;
    Object.keys(this.appetizer).forEach((menuName) => {
      amount += APPETIZER[menuName];
    });
    Object.keys(this.main).forEach((menuName) => {
      amount += MAIN[menuName];
    });
    Object.keys(this.dessert).forEach((menuName) => {
      amount += DESSERT[menuName];
    });
    Object.keys(this.drink).forEach((menuName) => {
      amount += DRINK[menuName];
    });
    return amount;
  }

  applyMenuDiscount() {
    // ...
  }
}

export default ReserveMenu;
