export class TestScene extends Phaser.Scene {
  preload() {
    this.load.image('starship', 'assets/starship.svg');
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.add.image(100, 200, 'starship');
  }
}
