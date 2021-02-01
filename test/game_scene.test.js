import 'regenerator-runtime/runtime';
import GameScene from '../src/scenes/game';

jest.mock('../src/scenes/game');

beforeEach(() => {
  GameScene.mockClear();
});

describe('Initialisation of game scene', () => {
  test('when successful', () => {
    GameScene();
    expect(GameScene).toHaveBeenCalledTimes(1);
  });

  test('when unsuccessful', () => {
    expect(GameScene).not.toHaveBeenCalled();
  });
});

describe('Post score to leaderboard api', () => {
  test('correct post request', () => {
    const gameScene = new GameScene();
    const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/m6IvkOM0ZVvqzOvjHVSC/scores/';
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: 'Test User', score: 200 }),
    };

    gameScene.postScore.mockReturnValue({ result: 'Leaderboard score created correctly.' });
    gameScene.postScore(apiUrl, request);

    const mockGameSceneInstance = GameScene.mock.instances[0];
    const mockGameScenePostScore = mockGameSceneInstance.postScore;
    expect(mockGameScenePostScore.mock.calls[0][0]).toBe(apiUrl);
    expect(mockGameScenePostScore.mock.calls[0][1]).toEqual(request);
    expect(mockGameScenePostScore.mock.results[0].value).toEqual({ result: 'Leaderboard score created correctly.' });
  });

  test('incorrect post request', () => {
    const gameScene = new GameScene();
    const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/m6IvkOM0ZVvqzOvjHVSC/scores/';
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: '', score: 0 }),
    };

    gameScene.postScore.mockReturnValue({ error: 'user and score are mandatory for post action.' });
    gameScene.postScore(apiUrl, request);

    const mockGameSceneInstance = GameScene.mock.instances[0];
    const mockGameScenePostScore = mockGameSceneInstance.postScore;
    expect(mockGameScenePostScore.mock.calls[0][0]).toBe(apiUrl);
    expect(mockGameScenePostScore.mock.calls[0][1]).toEqual(request);
    expect(mockGameScenePostScore.mock.results[0].value).toEqual({ error: 'user and score are mandatory for post action.' });
  });
});

test('Return value of game scene endGame function', () => {
  const gameScene = new GameScene();
  gameScene.endGame();

  const mockGameSceneInstance = GameScene.mock.instances[0];
  const mockGameSceneCreate = mockGameSceneInstance.endGame;
  expect(mockGameSceneCreate.mock.results[0].value).not.toBeTruthy();
});

test('Return value of game scene create function', () => {
  const gameScene = new GameScene();
  gameScene.create();

  const mockGameSceneInstance = GameScene.mock.instances[0];
  const mockGameSceneCreate = mockGameSceneInstance.create;
  expect(mockGameSceneCreate.mock.results[0].value).toBeFalsy();
});

test('Return value of game scene update function', () => {
  const gameScene = new GameScene();
  gameScene.update();

  const mockGameSceneInstance = GameScene.mock.instances[0];
  const mockGameSceneCreate = mockGameSceneInstance.update;
  expect(mockGameSceneCreate.mock.results[0].value).toBeFalsy();
});
