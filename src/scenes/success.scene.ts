import { getGoal } from "../goal";
import { getNextLevelInfoText, gotoNextLevel, wasLastLevel } from "../levels";
import { renderPressAnyKeyToContinue } from "../utils/text.utils";
import { EndScene } from "./end.scene";

export class SuccessScene extends Phaser.Scene {
  constructor() {
    super(SuccessScene.name);
  }

  preload() {}

  create() {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 150; // Starting position (adjust as needed)


    const controls = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      `ONE STEP CLOSER TO`,
      32); 
    controls.setOrigin();

    const text3 = this.add.bitmapText(
      centerX,
      startY + 60,
      'our-own-pixelfont',
      `${getGoal()}`,
      32);
    text3.setOrigin();
    text3.setTintFill(0xf04f78)

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
    if (wasLastLevel()) {
      this.scene.start(EndScene.name)
      return
    }
    gotoNextLevel(this.scene)
  }
}
