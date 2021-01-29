/* global Phaser */
import 'phaser';
import gameState from '../game_state';

class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async getScores(apiUrl) {
    try {
      const scoresJson = await fetch(apiUrl);
      const scoresObject = await scoresJson.json();
      return scoresObject;
    } catch (error) {
      const errorText = this.add.text(10, 560, `${error}`, { fontSize: '15px', fill: '#ff0000' });
      return errorText;
    }
  }

  static topTen(scoreObj) {
    return scoreObj.result.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  displayLeaderboard(topTen) {
    const leaderboardText = [];
    let y = 100;

    topTen.forEach((score, index) => {
      const nameText = this.add.text(0, 0, `${index + 1}. ${score.user}`, { fontSize: '15px', fill: '#ffffff' });
      const scoreText = this.add.text(0, 0, `Score: ${score.score}`, { fontSize: '15px', fill: '#ffffff' });
      const textObjects = [nameText, scoreText];

      leaderboardText.push(nameText);
      leaderboardText.push(scoreText);

      Phaser.Actions.GridAlign(textObjects, {
        width: -1,
        height: -1,
        cellWidth: 300,
        cellHeight: 1,
        position: 6,
        x: 275,
        y,
      });
      y += 40;
    }, this);

    return leaderboardText;
  }

  async create() {
    this.add.image(400, 300, 'background');
    const textOne = this.add.text(290, 25, 'Top 10 Leaderboard', { fontSize: '25px', fill: '#ffffff' });
    const textTwo = this.add.text(310, 550, 'Click to play again', { fontSize: '20px', fill: '#ffffff' });

    if (gameState.leaderboard === false) {
      gameState.leaderboard = true;

      const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TW582bP4TH7gwo1Ch2s0/scores/';
      const scoresObject = await this.getScores(apiUrl);
      const topTen = Leaderboard.topTen(scoresObject);
      const leaderboardText = this.displayLeaderboard(topTen);

      this.input.on('pointerup', () => {
        gameState.score = 1;
        gameState.name = '';
        gameState.end = false;
        gameState.leaderboard = false;
        this.scene.stop('Leaderboard');
        leaderboardText.forEach(scoreText => scoreText.destroy());
        this.scene.start('Title');
      });
    }

    return { textOne, textTwo }; // OR check gameState.leaderboard === true
  }
}

export { Leaderboard as default };
