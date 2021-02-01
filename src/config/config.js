/* global Phaser */
import 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'divId',
  width: 800,
  height: 600,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50 },
      enableBody: true,
    },
  },
};

export { config as default };
