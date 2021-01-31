import 'regenerator-runtime/runtime';
import Game from '../src/index';

jest.mock('../src/index');

beforeEach(() => {
  Game.mockClear();
});

describe('Creation of a new game object', () => {
  test('when successful', () => {
    Game();
    expect(Game).toHaveBeenCalledTimes(1);
  });

  test('when unsuccessful', () => {
    expect(Game).not.toHaveBeenCalled();
  });
});
