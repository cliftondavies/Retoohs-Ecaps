import 'regenerator-runtime/runtime';
import Title from '../src/scenes/title';

jest.mock('../src/scenes/title');

beforeEach(() => {
  Title.mockClear();
});

test('Successful initialising of title scene', () => {
  Title();
  expect(Title).toHaveBeenCalledTimes(1);
});

test('Unsuccessful initialising of title scene', () => {
  expect(Title).not.toHaveBeenCalled();
});

test('Return value of title create function', () => {
  const titleScene = new Title();
  titleScene.create();

  const mockTitleInstance = Title.mock.instances[0];
  const mockTitleCreate = mockTitleInstance.create;
  expect(mockTitleCreate.mock.results[0].value).not.toBeTruthy();
});
