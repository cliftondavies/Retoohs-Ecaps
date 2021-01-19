// const messageEl = document.createElement('div');
// messageEl.textContent = 'I was put here by Webpack!';
// document.body.appendChild(messageEl);
import 'phaser';

import { TestScene } from './scenes/test_scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: TestScene,
};

new Phaser.Game(gameConfig);
