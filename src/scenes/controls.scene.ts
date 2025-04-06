import { renderPressAnyKeyToContinue } from "../utils/text.utils";
import { SuccessScene } from "./success.scene";

export class ControlsScene extends Phaser.Scene {
  constructor() {
    super(ControlsScene.name);
  }

  preload() {}

  create() {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 100; // Starting position (adjust as needed)


    const controls = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      "MOVE LEFT AND RIGHT\n  WITH ARROW KEYS",
      32); 
    controls.setOrigin();

    const controls2 = this.add.bitmapText(
      centerX,
      startY + 150,
      'our-own-pixelfont',
      "FOCUS BACKGROUND OR FOREGROUND\n  WITH UP AND DOWN ARROW KEYS",
      32); 
    controls2.setOrigin();

    renderPressAnyKeyToContinue(this, centerX, startY + 300)

    this.input.on('pointerdown', () => this.goToNextScene());
    this.input.keyboard?.on('keydown', () => this.goToNextScene());
  }

  goToNextScene() {
    this.scene.start(SuccessScene.name);
  }
}
