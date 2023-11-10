import Controler from './Controler';
import InputView from './InputView';
import OutputView from './OutputView';
import ReserveDate from './Model/ReserveDate';
import ReserveMenu from './Model/ReserveMenu';

class App {
  #Controler;

  async run() {
    this.#Controler = new Controler();

    const RESERVE_DATE = await InputView.readDate();
    const DATE_CLASS = new ReserveDate(RESERVE_DATE);
    this.#Controler.setReserveDate(DATE_CLASS);

    const RESERVE_MENU = await InputView.readMenu();
    const MENU_CLASS = new ReserveMenu(RESERVE_MENU);
    this.#Controler.setReserveMenu(MENU_CLASS);

    this.#Controler.getPrintInfo();
    OutputView.printResult();
  }
}

export default App;
