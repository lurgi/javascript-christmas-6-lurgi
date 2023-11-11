import Controler from './Controler';
import InputView from './InputView';
import OutputView from './OutputView';
import ReserveDate from './Model/ReserveDate';
import ReserveMenu from './Model/ReserveMenu';

class App {
  #Controler;

  async run() {
    this.#Controler = new Controler();

    await this.handleDate();
    await this.handleMenu();

    this.#Controler.getPrintInfo();
    OutputView.printResult();
  }

  async handleDate() {
    try {
      const RESERVE_DATE = await InputView.readDate();
      const DATE_CLASS = new ReserveDate(RESERVE_DATE);
      this.#Controler.setReserveDate(DATE_CLASS);
    } catch (error) {
      OutputView.printOutput(error.message);
      await this.handleDate();
    }
  }

  async handleMenu() {
    try {
      const RESERVE_MENU = await InputView.readMenu();
      const MENU_CLASS = new ReserveMenu(RESERVE_MENU);
      this.#Controler.setReserveMenu(MENU_CLASS);
    } catch (error) {
      OutputView.printOutput(error.message);
      await this.handleMenu();
    }
  }
}

export default App;
