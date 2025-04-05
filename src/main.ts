import 'phaser';
import './style.css';
import { StartScene } from './scenes/start.scene.ts';
import { Level1 } from './level1';
import { buttonStyleConfig } from './utils/text.utils.ts';

class MainScene extends Phaser.Scene {
  constructor() {
    super(MainScene.name);
  }

  preload(): void {
    this.load.font('Bitfont', '/fonts/Bitfont.ttf', 'truetype');
  }

  create(): void {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 100; // Starting position (adjust as needed)

    const title = this.add.text(
      centerX,
      startY,
      'Depth of Field',
      buttonStyleConfig()
    );
    title.setOrigin();

    const pressToContinue = this.add.text(
      centerX,
      startY + title.height + 100,
      'Press any key to continue',
      buttonStyleConfig(24)
    );
    pressToContinue.setOrigin();

    this.input.on('pointerdown', () => this.goToFirstScene());
    this.input.keyboard?.on('keydown', () => this.goToFirstScene());
  }

  update(): void {}

  private goToFirstScene() {
    const sceneName = Level1.name;
    console.log(`Starting ${sceneName}`);
    this.scene.start(sceneName);
  }
}

let configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#FFF',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'thegame',
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [MainScene, StartScene, Level1],
};

new Phaser.Game(configObject);
