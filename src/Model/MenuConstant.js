export const APPETIZER = Object.freeze({
  양송이수프: 6000,
  타파스: 5500,
  시저샐러드: 8000,
});

export const MAIN = Object.freeze({
  티본스테이크: 55000,
  바비큐립: 54000,
  해산물파스타: 35000,
  크리스마스파스타: 25000,
});

export const DESSERT = Object.freeze({
  초코케이크: 15000,
  아이스크림: 5000,
});

export const DRINK = Object.freeze({
  제로콜라: 3000,
  레드와인: 60000,
  샴페인: 25000,
});

export const ERROR_MESSAGE = Object.freeze({
  notValid: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  notOnlyDrink: '[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.',
  notOver20: '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
});

export const OTHER_CONSTANT = Object.freeze({
  maxMenuCount: 20,
  minMenuCount: 1,
  weekDiscountRange: 2023,
});
