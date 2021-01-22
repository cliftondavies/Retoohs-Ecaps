/* global Phaser */
import 'phaser';

class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.text(200, 150, 'RETOOH ECAPS', { fontSize: '50px', fill: '#ffffff' });
    this.add.text(300, 300, 'Click to Start!', { fontSize: '25px', fill: '#ffffff' });

    this.input.on('pointerup', () => {
      this.scene.stop('Title');
      this.scene.start('Game');
    });
  }
}

export { Title as default };
