export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {}

  create() {
    const test = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Test",
      {
        fontFamily: "Bitfont",
        fontSize: "40px",
        color: "#ffffff",
      },
    );
    test.setOrigin();
  }
}
