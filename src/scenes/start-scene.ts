export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {}

  create() {
    this.add.text(100, 100, "Test", {
      fontFamily: "Bitfont",
      fontSize: "40px",
      color: "#ffffff",
    });
  }
}
