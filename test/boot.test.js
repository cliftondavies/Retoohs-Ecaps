import 'regenerator-runtime/runtime';
import Boot from '../src/scenes/boot';

jest.mock('../src/scenes/boot');

beforeEach(() => {
  Boot.mockClear();
});

test('Successful initialising of boot scene', () => {
  Boot();
  expect(Boot).toHaveBeenCalledTimes(1);
});

test('Unsuccessful initialising of boot scene', () => {
  expect(Boot).not.toHaveBeenCalled();
});

test('return value of boot preload function', () => {
  const bootScene = new Boot();
  bootScene.preload();

  const mockBootInstance = Boot.mock.instances[0];
  const mockBootPreload = mockBootInstance.preload;
  expect(mockBootPreload.mock.results[0].value).toBe(undefined);
});

test('return value of boot create function', () => {
  const bootScene = new Boot();
  bootScene.create();

  const mockBootInstance = Boot.mock.instances[0];
  const mockBootCreate = mockBootInstance.create;
  expect(mockBootCreate.mock.results[0].value).toBe(undefined);
});
