import InputView from './InputView';

class App {
  async run() {
    await InputView.readDate();
    await InputView.readMenu();
  }
}

export default App;
