/* global Phaser */
import 'regenerator-runtime/runtime';
import 'phaser';
import config from './config/config';
import Boot from './scenes/boot';
import Preloader from './scenes/preloader';
import Title from './scenes/title';
import GameScene from './scenes/game';
import Leaderboard from './scenes/leaderboard';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', Boot);
    this.scene.add('Preloader', Preloader);
    this.scene.add('Title', Title);
    this.scene.add('Game', GameScene);
    this.scene.add('Leaderboard', Leaderboard);
    this.scene.start('Boot');
  }
}

window.game = new Game();
