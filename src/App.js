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
    // TODO 혜택 내역 출력
    // TODO 총혜택 금액 출력
    // TODO 할인 후 예상 결제 금액 출력
    // TODO 뱃지 출력
  }

  async handleDate() {
    try {
      const INPUT = await InputView.readDate();
      this.#eventControler.setDate(INPUT);
    } catch (error) {
      OutputView.printString(error.message);
      await this.handleDate();
    }
  }

  async handleMenu() {
    try {
      const INPUT = await InputView.readMenu();
      this.#eventControler.setMenu(INPUT);
    } catch (error) {
      OutputView.printString(error.message);
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
}

export default App;
