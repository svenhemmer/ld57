import { Hud } from "../hud";
import { gotoNextLevel } from "../levels";
import { getLoaderConvenience } from "../utils/loader";
import { renderPressAnyKeyToContinue } from "../utils/text.utils";

export class ControlsScene extends Phaser.Scene {
  constructor() {
    super(ControlsScene.name);
  }

  preload() {
    getLoaderConvenience(this).prepareTextScene().getLoader().load(() => {})
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0)
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 200; // Starting position (adjust as needed)

    const heading = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      "CONTROLS",
      32); 
      heading.setOrigin();

    const controls = this.add.bitmapText(
      centerX,
      startY + 100,
      'our-own-pixelfont',
      "MOVE LEFT AND RIGHT\n  WITH ARROW KEYS",
      32); 
    controls.setOrigin();

    const controls2 = this.add.bitmapText(
      centerX,
      startY + 220,
      'our-own-pixelfont',
      "FOCUS BACKGROUND OR FOREGROUND\n  WITH UP AND DOWN ARROW KEYS",
      32); 
    controls2.setOrigin();

    renderPressAnyKeyToContinue(this, centerX, startY + 400)

    this.input.on('pointerdown', () => this.goToNextScene());
    this.input.keyboard?.on('keydown', () => this.goToNextScene());
  }

  goToNextScene() {
    // @ts-ignore
    if (globalThis.previousScene) {
      // @ts-ignore
      this.scene.switch(globalThis.previousScene)
      this.scene.setVisible(true, Hud.name)
      // @ts-ignore
      globalThis.previousScene = undefined
      return
    }
    gotoNextLevel(this.scene)
  }
}
