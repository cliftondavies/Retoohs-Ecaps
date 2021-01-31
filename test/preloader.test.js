import 'regenerator-runtime/runtime';
import Preloader from '../src/scenes/preloader';

jest.mock('../src/scenes/preloader');

beforeEach(() => {
  Preloader.mockClear();
});

describe('Creation of preloader scene', () => {
  test('Successful initialising of preloader scene', () => {
    Preloader();
    expect(Preloader).toHaveBeenCalledTimes(1);
  });

  test('Unsuccessful initialising of preloader scene', () => {
    expect(Preloader).not.toHaveBeenCalled();
  });
});

test('Return value of preloader preload function', () => {
  const preloaderScene = new Preloader();
  preloaderScene.preload();

  const mockPreloaderInstance = Preloader.mock.instances[0];
  const mockPreloaderPreload = mockPreloaderInstance.preload;
  expect(mockPreloaderPreload.mock.results[0].value).toBeFalsy();
});

test('Return value of preloader create function', () => {
  const preloaderScene = new Preloader();
  preloaderScene.create();

  const mockPreloaderInstance = Preloader.mock.instances[0];
  const mockPreloaderCreate = mockPreloaderInstance.create;
  expect(mockPreloaderCreate.mock.results[0].value).toBeFalsy();
});
