import { getGoal } from "../goal";
import { LevelGoal } from "../LevelGoal";
import { getLoaderConvenience } from "../utils/loader";
import { renderPressAnyKeyToContinue } from "../utils/text.utils";
import { End2Scene } from "./end2.scene";

export class EndScene extends Phaser.Scene {
  constructor() {
    super(EndScene.name);
  }

  preload() {
    console.debug('loading treasure')
    this.load.image('treasure', 'Treasure.png')
    getLoaderConvenience(this).prepareTextScene().getLoader().load(() => {})
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0)
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 200; // Starting position (adjust as needed)


    const text1 = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      `CONGRATULATIONS`,
      32); 
    text1.setOrigin();

    const text2 = this.add.bitmapText(
      centerX,
      startY + 60,
      'our-own-pixelfont',
      `YOU FINALLY FOUND`,
      32); 
    text2.setOrigin();


    const text3 = this.add.bitmapText(
      centerX,
      startY + 120,
      'our-own-pixelfont',
      `${getGoal()}`,
      32);
    text3.setOrigin();
    text3.setTintFill(0xf04f78)

    const treasure = new LevelGoal(
      this,
      centerX,
      startY + 250
    )
    treasure.sprite.setScale(4)
    treasure.sprite.postFX.addBlur(0, 2, 2, 5)

    setTimeout(() => {
      renderPressAnyKeyToContinue(this, centerX, startY + 400)

    this.input.on('pointerdown', () => this.goToNextScene());
    this.input.keyboard?.on('keydown', () => this.goToNextScene());
    }, 2000)
  }

  goToNextScene() {
    this.scene.start(End2Scene.name)
  }
}
