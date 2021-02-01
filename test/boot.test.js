import 'regenerator-runtime/runtime';
import Boot from '../src/scenes/boot';

jest.mock('../src/scenes/boot');

beforeEach(() => {
  Boot.mockClear();
});

describe('Initialising of boot scene', () => {
  test('when successful', () => {
    Boot();
    expect(Boot).toHaveBeenCalledTimes(1);
  });

  test('when unsuccessful', () => {
    expect(Boot).not.toHaveBeenCalled();
  });
});

test('Return value of boot preload function', () => {
  const bootScene = new Boot();
  bootScene.preload();

  const mockBootInstance = Boot.mock.instances[0];
  const mockBootPreload = mockBootInstance.preload;
  expect(mockBootPreload.mock.results[0].value).toBe(undefined);
});

test('Return value of boot create function', () => {
  const bootScene = new Boot();
  bootScene.create();

  const mockBootInstance = Boot.mock.instances[0];
  const mockBootCreate = mockBootInstance.create;
  expect(mockBootCreate.mock.results[0].value).toBe(undefined);
});
