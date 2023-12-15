import EventControler from './EventControler';
import InputView from './view/InputView';
import OutputView from './view/OutputView';

class App {
  #eventControler;

  async run() {
    OutputView.printStart();

    this.#eventControler = new EventControler();

    await this.handleDate();
    await this.handleMenu();
    this.handlePrintDate();
    this.handlePrintMenu();
    this.handlePrintAmountBeforeDiscount();
    this.handlePrintPresent();
    this.handleBenefit();
    this.handleTotalBenefitAmount();
    // TODO 할인 후 예상 결제 금액 출력
    // TODO 뱃지 출력
  }

  async handleDate() {
    try {
      const INPUT = await InputView.readDate();
      this.#eventControler.setDate(INPUT);
    } catch (error) {
      OutputView.print(error.message);
      await this.handleDate();
    }
  }

  async handleMenu() {
    try {
      const INPUT = await InputView.readMenu();
      this.#eventControler.setMenu(INPUT);
    } catch (error) {
      OutputView.print(error.message);
      await this.handleMenu();
    }
  }

  handlePrintDate() {
    const DATE = this.#eventControler.getDate();
    OutputView.printDateString(DATE);
  }

  handlePrintMenu() {
    const MENU = this.#eventControler.getMenu();
    OutputView.printMenu(MENU);
  }

  handlePrintAmountBeforeDiscount() {
    const AMOUNT_PRICE = this.#eventControler.getAmountBeforeDiscount();
    OutputView.printAMountBeforeDiscount(AMOUNT_PRICE);
  }

  handlePrintPresent() {
    const PRESSENT_BOL = this.#eventControler.getIsPresent();
    OutputView.printPresent(PRESSENT_BOL);
  }

  handleBenefit() {
    OutputView.printBenefitStart();

    if (this.#eventControler.getUnder10000()) {
      OutputView.printNothing();
      return;
    }

    const D_DAY_DISCOUNT = this.#eventControler.getAmountDDayDiscount();
    OutputView.printDDayBenefit(D_DAY_DISCOUNT);

    const IS_WEEKEND = this.#eventControler.getIsWeekend();
    const WEEK_DISCOUNT = this.#eventControler.getWeekDiscount();
    OutputView.printWeekBenefit(IS_WEEKEND, WEEK_DISCOUNT);

    const IS_SPECIAL = this.#eventControler.getIsSpecial();
    OutputView.printSpecial(IS_SPECIAL);

    const IS_PRESENT = this.#eventControler.getIsPresent();
    OutputView.printPresentBenefit(IS_PRESENT);

    if (!D_DAY_DISCOUNT && !WEEK_DISCOUNT && !IS_SPECIAL && !IS_PRESENT) {
      OutputView.printNothing();
    }
  }

  handleTotalBenefitAmount() {
    const TOTAL_BENEFIT_AMOUNT = this.#eventControler.getTotalBenefitAmount();
    OutputView.printTotalBenefitAmount(TOTAL_BENEFIT_AMOUNT);
  }
}

export default App;
