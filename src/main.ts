import 'phaser';
import './style.css';
import { ControlsScene } from './scenes/controls.scene.ts';
import { levels } from './levels.ts';
// import { buttonStyleConfig } from './utils/text.utils.ts';

class MainScene extends Phaser.Scene {
  constructor() {
    super(MainScene.name);
  }

  preload(): void {
    // this.load.font('Bitfont', '/fonts/Bitfont.ttf', 'truetype');
    let file = 'Bitfont1';
    this.load.bitmapFont('our-own-pixelfont', 'fonts/' + file + '.png', 'fonts/' + file + '.xml');
  }

  create(): void {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 100; // Starting position (adjust as needed)

    const title = this.add.bitmapText(
        centerX,
        startY,
        'our-own-pixelfont',
        "DEPTH OF FIELD",
        64); 
    // const title = this.add.text(
    //   centerX,
    //   startY,
    //   'Depth of Field',
    //   buttonStyleConfig()
    // );
    title.setOrigin();

    const pressToContinue = this.add.bitmapText(
        centerX,
        startY + title.height + 100,
        'our-own-pixelfont',
        "PRESS ANY KEY TO CONTINUE",
        32); 
    // const pressToContinue = this.add.text(
    //   centerX,
    //   startY + title.height + 100,
    //   'Press any key to continue',
    //   buttonStyleConfig(24)
    // );
    pressToContinue.setOrigin();

    this.input.on('pointerdown', () => this.goToFirstScene());
    this.input.keyboard?.on('keydown', () => this.goToFirstScene());
  }

  update(): void {}

  private goToFirstScene() {
    const sceneName = ControlsScene.name;
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
    zoom: 4
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { x: 0, y: 450 },
    },
  },
  scene: [MainScene, ControlsScene, ...levels],
};

new Phaser.Game(configObject);
