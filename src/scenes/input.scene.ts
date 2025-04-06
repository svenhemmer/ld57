import { getGoal, setGoal } from '../goal';
import { getLoaderConvenience } from '../utils/loader';
import { renderPressAnyKeyToContinue } from '../utils/text.utils';
import { ControlsScene } from './controls.scene';

export class InputScene extends Phaser.Scene {
  constructor() {
    super(InputScene.name);
  }

  preload() {
    getLoaderConvenience(this).prepareTextScene().getLoader().load(() => {})
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0)
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 150; // Starting position (adjust as needed)

    const controls = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      'WHAT DO YOU STRIFE FOR IN LIFE?',
      32
    );
    controls.setOrigin();

    setTimeout(() => {
      let goal = prompt(
        'What do you strife for in life?\n\nPower? Happiness? Riches?\n\nLean back and take a moment to think.\n\n(for budgeting reasons, only characters A-Z and 0-9 are allowed)',
        ''
      );

      if (goal === '' || goal === null) {
        goal = 'Happiness';
      }
      setGoal(goal);
      const text2 = this.add.bitmapText(
        centerX,
        startY + 120,
        'our-own-pixelfont',
        `YOU ARE LONGING FOR}`,
        32
      );
      text2.setOrigin();
      const text3 = this.add.bitmapText(
        centerX,
        startY + 200,
        'our-own-pixelfont',
        `${getGoal()}`,
        32
      );
      text3.setOrigin();
      text3.setTintFill(0xf04f78);

      renderPressAnyKeyToContinue(this, centerX, startY + 300);

      this.input.on('pointerdown', () => this.goToNextScene());
      this.input.keyboard?.on('keydown', () => this.goToNextScene());
    }, 200);
  }

  goToNextScene() {
    this.scene.start(ControlsScene.name);
  }
}
