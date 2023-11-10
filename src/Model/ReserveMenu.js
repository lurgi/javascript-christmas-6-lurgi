class ReserveMenu {
  menu = {};

  constructor(menuInfo) {
    menuInfo.forEach((menuDetail) => {
      const [menuName, menuCount] = menuDetail.split('-');
      this.menu[menuName] = menuCount;
    });
  }

  applyDateDiscount() {}
}

export default ReserveMenu;