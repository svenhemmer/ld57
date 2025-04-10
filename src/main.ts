import 'phaser';
import './style.css';
import { ControlsScene } from './scenes/controls.scene.ts';
import { levels } from './levels.ts';
import { SuccessScene } from './scenes/success.scene.ts';
import { renderPressAnyKeyToContinue } from './utils/text.utils.ts';
import { InputScene } from './scenes/input.scene.ts';
import { EndScene } from './scenes/end.scene.ts';
import { End2Scene } from './scenes/end2.scene.ts';
import { AudioManagerScene } from './scenes/audio-manager.scene.ts';

import { Hud } from './hud.ts';
import { getLoaderConvenience } from './utils/loader.ts';
// import { buttonStyleConfig } from './utils/text.utils.ts';

class MainScene extends Phaser.Scene {
  constructor() {
    super(MainScene.name);
  }

  preload(): void {
    // this.load.font('Bitfont', '/fonts/Bitfont.ttf', 'truetype');
    let file = 'Bitfont1';
    this.load.bitmapFont(
      'our-own-pixelfont',
      'fonts/' + file + '.png',
      'fonts/' + file + '.xml'
    );
    getLoaderConvenience(this).prepareTextScene().getLoader().load(() => {})
  }

  create(): void {
    this.add.image(0, 0, 'bg').setOrigin(0)
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 150; // Starting position (adjust as needed)

    const title = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      'DEPTH OF FIELD',
      64
    );
    // const title = this.add.text(
    //   centerX,
    //   startY,
    //   'Depth of Field',
    //   buttonStyleConfig()
    // );
    title.setOrigin();

    const credits = this.add.bitmapText(
        centerX,
        this.cameras.main.height - 80,
        'our-own-pixelfont',
        '           FROM\nDANIEL  KARLA  SIMON  SVEN',
        32
      );
      credits.setOrigin();

    renderPressAnyKeyToContinue(this, centerX, startY + title.height + 100);

    this.input.on('pointerdown', () => this.goToFirstScene());
    this.input.keyboard?.on('keydown', () => this.goToFirstScene());
  }

  update(): void {}

  private goToFirstScene() {
    const sceneName = InputScene.name;
    console.log(`Starting ${sceneName}`);
    this.scene.start(sceneName);
  }
}

let configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: 0xfdcbb0,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'thegame',
    width: 800,
    height: 600,
    zoom: 4,
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
        debug: false,
        gravity: { x: 0, y: 450 },
    },
  },
  audio: { disableWebAudio: false },
  scene: [
    MainScene,
    AudioManagerScene,
    ControlsScene,
    SuccessScene,
    InputScene,
    EndScene,
    End2Scene,
    Hud,
    ...levels,
  ],
};

new Phaser.Game(configObject);
