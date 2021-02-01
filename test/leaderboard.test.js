import 'regenerator-runtime/runtime';
import Leaderboard from '../src/scenes/leaderboard';

jest.mock('../src/scenes/leaderboard');

beforeEach(() => {
  Leaderboard.mockClear();
});

describe('Initialisation of leaderboard scene', () => {
  test('when successful', () => {
    Leaderboard();
    expect(Leaderboard).toHaveBeenCalledTimes(1);
  });

  test('when unsuccessful', () => {
    expect(Leaderboard).not.toHaveBeenCalled();
  });
});

describe('Get scores from leaderboard api', () => {
  test('with a valid api url', () => {
    const leaderboard = new Leaderboard();
    const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/m6IvkOM0ZVvqzOvjHVSC/scores/';
    const scoresObject = {
      result: [
        {
          user: 'John Doe',
          score: 42,
        },
      ],
    };

    leaderboard.getScores.mockReturnValue(scoresObject);
    leaderboard.getScores(apiUrl);

    const mockLeaderboardInstance = Leaderboard.mock.instances[0];
    const mockLeaderboardGetScores = mockLeaderboardInstance.getScores;
    expect(mockLeaderboardGetScores.mock.calls[0][0]).toBe(apiUrl);
    expect(mockLeaderboardGetScores.mock.results[0].value).toEqual(scoresObject);
  });

  test('with an invalid api url', () => {
    const leaderboard = new Leaderboard();
    const apiUrl = '';

    leaderboard.getScores.mockReturnValue({ error: 'Bad Request!' });
    leaderboard.getScores(apiUrl);

    const mockLeaderboardInstance = Leaderboard.mock.instances[0];
    const mockLeaderboardGetScores = mockLeaderboardInstance.getScores;
    expect(mockLeaderboardGetScores.mock.calls[0][0]).toBe(apiUrl);
    expect(mockLeaderboardGetScores.mock.results[0].value).toEqual({ error: 'Bad Request!' });
  });
});

test('Return value of leaderboard topTen method', () => {
  const scoreList = {
    result: [
      {
        user: 'John Doe',
        score: 4,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
    ],
  };
  const topTen = scoreList.result.sort((a, b) => b.score - a.score).slice(0, 10);
  Leaderboard.topTen.mockReturnValue(topTen);
  expect(Leaderboard.topTen(scoreList)[0].score).toBe(50);
});

test('Return value of leaderboard create function', () => {
  const leaderboard = new Leaderboard();
  leaderboard.create();

  const mockLeaderboardInstance = Leaderboard.mock.instances[0];
  const mockLeaderboardCreate = mockLeaderboardInstance.create;
  expect(mockLeaderboardCreate.mock.results[0].value).not.toBeTruthy();
});
