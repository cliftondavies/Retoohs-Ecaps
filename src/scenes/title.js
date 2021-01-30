/* global Phaser */
import 'phaser';
import gameState from '../game_state';

class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.text(200, 150, 'RETOOH ECAPS', { fontSize: '50px', fill: '#ffffff' });

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Enter your name to start');

    const style = {
      border: 'none',
      borderRadius: '15px 0 15px 0',
      borderBottom: '3px solid rgba(101, 149, 187, 0.8)',
      outline: 'none',
      padding: '10px 10px',
      fontSize: '20px',
      fontWeight: '600',
      background: 'rgba(255, 255, 255, 0.7)',
    };

    const domElement = this.add.dom(400, 300, nameInput, style);

    domElement.addListener('keypress');
    domElement.on('keypress', (event) => {
      if (event.keyCode === 13) {
        const input = domElement.node;
        if (input.value !== '') {
          gameState.name = input.value;
          input.value = '';
          input.blur();
          this.scene.stop('Title');
          this.scene.start('Game');
        }
      }
    }, this);
  }
}

export { Title as default };
