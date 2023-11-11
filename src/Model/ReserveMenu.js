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
  appetizer = {};

  main = {};

  dessert = {};

  drink = {};

  constructor(menuInfo) {
    const MENU_DETAIL = menuInfo.map((menuDetail) => menuDetail.split('-'));
    const MENU_NAMES = MENU_DETAIL.map(([menuName]) => menuName);

    MENU_DETAIL.forEach(([menuName, menuCount, other]) => {
      if (other) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
      this.validateMenu(menuName, menuCount);
      if (APPETIZER[menuName]) {
        this.appetizer[menuName] = Number(menuCount);
      }
      if (MAIN[menuName]) {
        this.main[menuName] = Number(menuCount);
      }
      if (DESSERT[menuName]) {
        this.dessert[menuName] = Number(menuCount);
      }
      if (DRINK[menuName]) {
        this.drink[menuName] = Number(menuCount);
      }
    });

    if (MENU_NAMES.length !== new Set(MENU_NAMES).size) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
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

  applyMenuDiscount() {
    // ...
  }
}

export default ReserveMenu;
