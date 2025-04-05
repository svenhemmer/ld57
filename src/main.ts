import 'phaser';
import './style.css';
import StartScene from "./scenes/start-scene.ts";
import { Level1 } from './level1';

const buttonConfig = (fontSize = 40) => ({
  fontFamily: "Bitfont",
  backgroundColor: "#0a0",
  fontSize: `${fontSize}px`,
});

class PlayGame extends Phaser.Scene {
  image!: Phaser.GameObjects.Image;

  constructor() {
    super("PlayGame");
  }

  preload(): void {
    this.load.font("Bitfont", "/fonts/Bitfont.ttf", "truetype");
  }

  create(): void {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 100; // Starting position (adjust as needed)

    const title = this.add.text(
      centerX,
      startY,
      "Depth of Field",
      buttonConfig(),
    );
    title.setOrigin(0.5, 0.5);

    const pressToContinue = this.add.text(
      centerX,
      startY + title.height + 100,
      "Press any key to continue",
      buttonConfig(24),
    );
    pressToContinue.setOrigin(0.5, 0.5);

    this.input.on("pointerdown", () => this.goToStartScene());
    this.input.keyboard?.on("keydown-ENTER", () => this.goToStartScene());
  }

  update(): void {
    //this.image.rotation += 0.01;
  }

  private goToStartScene() {
    console.log("Starting StartScene");
    this.scene.start("StartScene");
  }
}
 
let configObject : Phaser.Types.Core.GameConfig = {
    backgroundColor: '#FFF',
    scale : {
        mode        : Phaser.Scale.FIT,
        autoCenter  : Phaser.Scale.CENTER_BOTH,
        parent      : 'thegame',
        width       : 800,
        height      : 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [PlayGame, StartScene, Level1]
};

new Phaser.Game(configObject);
