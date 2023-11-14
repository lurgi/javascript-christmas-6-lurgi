function convertPrintNum(number) {
  return Number(number).toLocaleString();
}

export const OUTPUT_MESSAGES = Object.freeze({
  previewEvent: (reserveDate) =>
    `12월 ${reserveDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderMenu: '\n<주문 메뉴>',
  beforeDiscount: '\n<할인 전 총주문 금액>',
  present: '\n<증정 메뉴>',
  benefit: '\n<혜택 내역>',
  totalBenefitAmount: '\n<총혜택 금액>',
  payAmount: '\n<할인 후 예상 결제 금액>',
  badge: '\n<12월 이벤트 배지>',
});

export const OUTPUT_LIST = Object.freeze({
  weekDayOrEnd: (isWeekEnd) => (isWeekEnd ? '주말 할인:' : '평일 할인:'),
  dDay: '크리스마스 디데이 할인:',
  special: '특별 할인:',
  present: '증정 이벤트:',
});

export const OUTPUT_PRICE = Object.freeze({
  special: 1000,
  present: 25000,
  presentBaseAmount: 120000,
  santaBadgeBaseAmount: -20000,
  treeBadgeBaseAmount: -10000,
  starBadgeBaseAmount: -5000,
});

export const OUTPUT_RESULT = Object.freeze({
  orderMenuDetail: (name, count) => `${name} ${count}개`,
  amount: (amount) => `${convertPrintNum(amount)}원`,
  negativeAmount: (amount) => `-${convertPrintNum(amount)}원`,
  present: (amount) => (amount >= OUTPUT_PRICE.presentBaseAmount ? '샴페인 1개' : '없음'),
  nothing: '없음',
  badgeSanta: '산타',
  badgeTree: '트리',
  badgeStar: '별',
});
