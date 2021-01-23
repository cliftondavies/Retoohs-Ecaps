/* global Phaser */
import 'phaser';
import gameState from '../game_state';

class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async scoreList() {
    try {
      const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ifdS41s0Fmwd6vzf41Kt/scores/';
      const scoresJson = await fetch(apiUrl);
      const scoresObject = await scoresJson.json();
      return scoresObject.result;
    } catch (error) {
      const errorText = this.add.text(400, 10, `${error}`, { fontSize: '15px', fill: '#ff0000' });
      return errorText;
    }
  }

  async topTen() {
    try {
      const topTen = [];
      const scoreList = await this.scoreList();
      scoreList.forEach(obj => {
        topTen.push(obj.score);
      });
      return Array.from(new Set(topTen)).sort((a, b) => b - a).slice(0, 10);
      // return topTen.sort((a, b) => b - a);
    } catch (error) {
      const errorText = this.add.text(400, 10, `${error}`, { fontSize: '15px', fill: '#ff0000' });
      return errorText;
    }
  }

  async displayLeaderboard() {
    try {
      const topTen = await this.topTen();
      let y = 60;
      topTen.forEach((score, index) => {
        if (score === gameState.score) {
          this.add.text(10, y, `Your Score. ${'.'.repeat(99)} ${score}`, { fontSize: '15px', fill: '#ffffff' });
        } else {
          this.add.text(10, y, `${index + 1}. ${'.'.repeat(99)} ${score}`, { fontSize: '15px', fill: '#ffffff' });
        }
        y += 50;
      }, this);
      return topTen;
    } catch (error) {
      const errorText = this.add.text(400, 10, `${error}`, { fontSize: '15px', fill: '#ff0000' });
      return errorText;
    }
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.text(10, 10, 'Top 10 Leaderboard', { fontSize: '25px', fill: '#ffffff' });
    this.displayLeaderboard();
    this.add.text(280, 550, 'Click to play again', { fontSize: '20px', fill: '#ffffff' });
    this.input.on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('Leaderboard');
      this.scene.start('Game');
    });
  }
}

export { Leaderboard as default };
