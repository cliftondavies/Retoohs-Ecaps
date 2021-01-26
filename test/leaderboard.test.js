import 'regenerator-runtime/runtime';
import Leaderboard from '../src/scenes/leaderboard';

test('leaderboard score list', () => {
  const scoreObj = {
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
  expect(Leaderboard.scoreList(scoreObj)).toEqual(scoreObj.result);
});

test('leaderboard top ten', () => {
  const scoreList = [
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
  ];
  expect(Leaderboard.topTen(scoreList)).toEqual([50, 35, 4]);
});
