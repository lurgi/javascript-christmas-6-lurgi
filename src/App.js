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
    // TODO 총혜택 금액 출력
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
    const PRESSENT_BOL = this.#eventControler.isPresent();
    OutputView.printPresent(PRESSENT_BOL);
  }

  handleBenefit() {
    OutputView.printBenefitStart();

    const D_DAY_DISCOUNT = this.#eventControler.getAmountDDayDiscount();
    OutputView.printDDayBenefit(D_DAY_DISCOUNT);
    // TODO 평일 주말 할인 출력
    // TODO 특별 할인
    // TODO 증정 이벤트
  }
}

export default App;
