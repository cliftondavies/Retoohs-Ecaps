/* global Phaser */
import 'phaser';
import gameState from '../game_state';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.add.image(400, 300, 'background');
    gameState.player = this.physics.add.sprite(225, 450, 'player').setScale(0.1);

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

    const enemyLoop = this.time.addEvent({
      delay: 1000,
      callback: spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    const enemyShootLoop = this.time.addEvent({
      delay: 1000,
      callback: shootPlayer,
      callbackScope: this,
      loop: true,
    });

    // trigger player fire
    this.input.keyboard.on('keydown-SPACE', () => {
      const { x, y } = gameState.player;
      const shot = this.playerFire.create(x, y, 'playerFire').setScale(0.1);
      shot.setVelocityY(-260);
    });

    // collider between enemy and player fire
    this.physics.add.collider(this.enemies, this.playerFire, (enemy, playerFire) => {
      enemy.destroy();
      playerFire.destroy();
      gameState.score += 20;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });

    // implement collider between player and enemy fire = game over
    this.physics.add.collider(gameState.player, this.enemyFire, () => {
      enemyShootLoop.destroy();
      enemyLoop.destroy();
      this.physics.pause();
      this.add.text(220, 300, 'Game Over!', { fontSize: '15px', fill: '#ffffff' });
      this.add.text(275, 350, 'Click to see leaderboard', { fontSize: '15px', fill: '#ffffff' });

      this.input.on('pointerup', () => {
        gameState.score = 0;
        // this.scene.restart();
        this.scene.stop('Game');
        this.scene.start('Score');
      });
    });

    // collider between player and enemy ship = game over
    this.physics.add.collider(gameState.player, this.enemies, () => {
      enemyShootLoop.destroy();
      enemyLoop.destroy();
      this.physics.pause();
      this.add.text(220, 300, 'Game Over!', { fontSize: '15px', fill: '#ffffff' });
      this.add.text(275, 350, 'Click to see leaderboard', { fontSize: '15px', fill: '#ffffff' });

      this.input.on('pointerup', () => {
        gameState.score = 0;
        // this.scene.restart();
        this.scene.stop('Game');
        this.scene.start('Score');
      });
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

    // implement out of bounds for player
    this.playerFire.getChildren().forEach(shot => {
      if (shot.y < 0) {
        shot.destroy();
      }
    });

    // implement out of bounds for enemy
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.y > 800) {
        enemy.destroy();
        gameState.score += 20;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
      }
    });

    // implement out of bounds for enemy fire
    this.enemyFire.getChildren().forEach(shot => {
      if (shot.y > 800) {
        shot.destroy();
      }
    });
  }
}

export { GameScene as default };
