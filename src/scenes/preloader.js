/* global Phaser */
import 'phaser';

class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
    // this.readyCount = 0;
  }

  // init() {

  // }

  // ready() {
  //   this.readyCount += 1;
  //   if (this.readyCount === 2) {
  //     this.scene.stop('Preloader');
  //     this.scene.start('Title');
  //   }
  // }

  preload() {
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width, height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      // this.ready();
    });

    // this.time.delayedCall(1000, this.ready, [], this); // remove timeevent

    this.load.image('player', 'assets/starship.svg');
    this.load.image('enemy', 'assets/starshipdark.svg');
    this.load.image('playerFire', 'assets/projectile2.svg');
    this.load.image('enemyFire', 'assets/projectile1.svg');
  }

  create() {
    this.scene.stop('Preloader');
    this.scene.start('Title');
  }
}

export { Preloader as default };
