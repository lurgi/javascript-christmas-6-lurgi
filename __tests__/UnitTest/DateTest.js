import App from '../../src/App';
import { getLogSpy, mockQuestions } from '../utils';

/* eslint-disable */

const ERROR_MESSAGE = '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';

describe('Date Test', () => {
  test('날짜 입력 테스트', async () => {
    const logSpy = getLogSpy();
    const QUESTIONS = ['0', '32', 'qw', '5'];
    const OUTPUTS = [ERROR_MESSAGE, ERROR_MESSAGE, ERROR_MESSAGE];
    mockQuestions(QUESTIONS);

    const APP = new App();
    APP.setEventControler();
    await APP.handleDate();
    OUTPUTS.forEach((output, index) => {
      const LOGS = [...logSpy.mock.calls];
      expect(LOGS[index][0]).toStrictEqual(output);
    });
  });
});
