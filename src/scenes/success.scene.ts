import { getNextLevelInfoText, gotoNextLevel } from "../levels";
import { renderPressAnyKeyToContinue } from "../utils/text.utils";

export class SuccessScene extends Phaser.Scene {
  constructor() {
    super(SuccessScene.name);
  }

  preload() {}

  create() {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 100; // Starting position (adjust as needed)


    const controls = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      "SUCCESS",
      32); 
    controls.setOrigin();

    const controls2 = this.add.bitmapText(
      centerX,
      startY + 150,
      'our-own-pixelfont',
      `PREPARING ${getNextLevelInfoText()}`,
      32); 
    controls2.setOrigin();


    renderPressAnyKeyToContinue(this, centerX, startY + 300)

    this.input.on('pointerdown', () => this.goToNextScene());
    this.input.keyboard?.on('keydown', () => this.goToNextScene());
  }

  goToNextScene() {
    gotoNextLevel(this.scene)
  }
}
