import Controler from './Controler';
import InputView from './InputView';

class App {
  #Controler;

  async run() {
    const RESERVE_DATE = await InputView.readDate();
    const RESERVE_MENU = await InputView.readMenu();

    this.#Controler = new Controler(RESERVE_DATE, RESERVE_MENU);
    this.#Controler.getPrintInfo();
  }
}

export default App;
