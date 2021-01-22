/* global Phaser */
import 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50 },
      enableBody: true,
    },
  },
};

export { config as default };
