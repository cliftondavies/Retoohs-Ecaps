/* global Phaser */
import 'phaser';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/space.svg');
    this.load.image('logo', 'assets/starship.svg');
  }

  create() {
    this.scene.stop('Boot');
    this.scene.start('Preloader');
  }
}

export { Boot as default };
