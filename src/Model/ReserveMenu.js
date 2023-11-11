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

  MenuTypeNumber = 0;

  constructor(menuInfo) {
    const MENU_DETAIL = menuInfo.map((menuDetail) => menuDetail.split('-'));
    const MENU_NAMES = MENU_DETAIL.map(([menuName]) => menuName);
    this.MenuTypeNumber = MENU_NAMES.length;

    if (MENU_NAMES.length !== new Set(MENU_NAMES).size) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }

    let totalMenuNumber = 0;
    MENU_DETAIL.forEach(([menuName, menuCount, other]) => {
      const NUMBER_COUNT = Number(menuCount);
      totalMenuNumber += NUMBER_COUNT;
      if (other) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
      this.validateMenu(menuName, menuCount);
      if (APPETIZER[menuName]) {
        this.appetizer.set(menuName, NUMBER_COUNT);
      }
      if (MAIN[menuName]) {
        this.main.set(menuName, NUMBER_COUNT);
      }
      if (DESSERT[menuName]) {
        this.dessert.set(menuName, NUMBER_COUNT);
      }
      if (DRINK[menuName]) {
        this.drink.set(menuName, NUMBER_COUNT);
      }
    });
    this.validOnlyDrink();
    if (totalMenuNumber > 20) {
      throw new Error(
        '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
      );
    }
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
    if (this.MenuTypeNumber === this.drink.size) {
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
