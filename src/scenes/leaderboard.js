/* global Phaser */
import 'phaser';
import gameState from '../game_state';

class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  static scoreList(scoresObj) {
    return scoresObj.result;
  }

  static topTen(scoreList) {
    const topTen = [];
    scoreList.forEach(obj => {
      topTen.push(obj.score);
    });
    return Array.from(new Set(topTen)).sort((a, b) => b - a).slice(0, 10);
  }

  displayLeaderboard(topTen, currentScore) {
    const leaderboardText = [];
    let y = 60;
    topTen.forEach((score, index) => {
      if (score === currentScore) {
        const text = this.add.text(10, y, `Your Score: ${'.'.repeat(84)} ${score}`, { fontSize: '15px', fill: '#ffffff' });
        leaderboardText.push(text);
      } else {
        const seperator = (index < 9) ? '.'.repeat(99) : '.'.repeat(97);
        const text = this.add.text(10, y, `${index + 1}: ${seperator} ${score}`, { fontSize: '15px', fill: '#ffffff' });
        leaderboardText.push(text);
      }
      y += 50;
    }, this);
    return leaderboardText;
  }

  async create() {
    try {
      this.add.image(400, 300, 'background');
      this.add.text(290, 10, 'Top 10 Leaderboard', { fontSize: '25px', fill: '#ffffff' });
      this.add.text(310, 550, 'Click to play again', { fontSize: '20px', fill: '#ffffff' });
      const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ifdS41s0Fmwd6vzf41Kt/scores/';
      const scoresJson = await fetch(apiUrl);
      const scoresObject = await scoresJson.json();
      const scoreList = Leaderboard.scoreList(scoresObject);
      const topTen = Leaderboard.topTen(scoreList);
      const leaderboardText = this.displayLeaderboard(topTen, gameState.score);
      this.input.on('pointerup', () => {
        gameState.score = 0;
        this.scene.stop('Leaderboard');
        leaderboardText.forEach(scoreText => scoreText.destroy());
        this.scene.start('Game');
      });
      return leaderboardText;
    } catch (error) {
      const errorText = this.add.text(570, 10, `${error}`, { fontSize: '15px', fill: '#ff0000' });
      return errorText;
    }
  }
}

export { Leaderboard as default };
