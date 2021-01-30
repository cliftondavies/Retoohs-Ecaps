import 'regenerator-runtime/runtime';
import Game from '../src/index';

jest.mock('../src/index');

beforeEach(() => {
  Game.mockClear();
});

test('Successful creation of a new game object', () => {
  Game();
  expect(Game).toHaveBeenCalledTimes(1);
});

test('Unsuccessful creation of a new game object', () => {
  expect(Game).not.toHaveBeenCalled();
});
