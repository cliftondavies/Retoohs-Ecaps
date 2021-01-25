/* global Phaser */
import 'phaser';
import gameState from '../game_state';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  endGame() {
    this.enemyShootLoop.destroy();
    this.enemyLoop.destroy();
    this.physics.pause();
    this.add.text(320, 250, 'Game Over!', { fontSize: '30px', fill: '#ffffff' });
    this.add.text(280, 300, 'Click to see leaderboard', { fontSize: '20px', fill: '#ffffff' });

    this.input.on('pointerup', async () => {
      try {
        const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ifdS41s0Fmwd6vzf41Kt/scores/';
        const request = {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: ' ', score: gameState.score }),
        };
        const resultJson = await fetch(apiUrl, request);
        const resultObject = await resultJson.json();
        this.scene.stop('Game');
        this.scene.start('Leaderboard');
        return resultObject;
      } catch (error) {
        const errorText = this.add.text(100, 10, `${error}`, { fontSize: '15px', fill: '#ff0000' });
        return errorText;
      }
    });
  }

  create() {
    this.add.image(400, 300, 'background');
    gameState.player = this.physics.add.sprite(400, 450, 'player').setScale(0.1);

    gameState.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '15px', fill: '#ffffff' });

    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.enemies = this.physics.add.group();
    this.enemyFire = this.physics.add.group();
    this.playerFire = this.physics.add.group();

    const spawnEnemy = () => {
      const xCoord = Phaser.Math.Between(20, 780);
      const enemy = this.enemies.create(xCoord, 0, 'enemy').setScale(0.1);
      enemy.flipY = true;
    };

    const shootPlayer = () => {
      this.enemies.getChildren().forEach(enemy => {
        const { x, y } = enemy;
        const shot = this.enemyFire.create(x, y, 'enemyFire').setScale(0.1);
        shot.setVelocityY(200);
      });
    };

    this.enemyLoop = this.time.addEvent({
      delay: 1000,
      callback: spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    this.enemyShootLoop = this.time.addEvent({
      delay: 1000,
      callback: shootPlayer,
      callbackScope: this,
      loop: true,
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      const { x, y } = gameState.player;
      const shot = this.playerFire.create(x, y, 'playerFire').setScale(0.1);
      shot.setVelocityY(-260);
    });

    this.physics.add.overlap(this.enemies, this.playerFire, (enemy, playerFire) => {
      enemy.destroy();
      playerFire.destroy();
      gameState.score += 20;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });

    this.physics.add.overlap(gameState.player, this.enemyFire, () => {
      this.endGame();
    });

    this.physics.add.overlap(gameState.player, this.enemies, () => {
      this.endGame();
    });
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-200);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(200);
    } else if (gameState.cursors.up.isDown) {
      gameState.player.setVelocityY(-200);
    } else if (gameState.cursors.down.isDown) {
      gameState.player.setVelocityY(200);
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.setVelocityY(0);
    }

    this.playerFire.getChildren().forEach(shot => {
      if (shot.y < 0) {
        shot.destroy();
      }
    });

    this.enemies.getChildren().forEach(enemy => {
      if (enemy.y > 600) {
        enemy.destroy();
        gameState.score += 20;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
      }
    });

    this.enemyFire.getChildren().forEach(shot => {
      if (shot.y > 600) {
        shot.destroy();
      }
    });
  }
}

export { GameScene as default };
