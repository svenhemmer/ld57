
export class End2Scene extends Phaser.Scene {
  constructor() {
    super(End2Scene.name);
  }

  preload() {
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY - 200; // Starting position (adjust as needed)


    const text1 = this.add.bitmapText(
      centerX,
      startY,
      'our-own-pixelfont',
      `WHAT NOW YOU ASK?`,
      32); 
    text1.setOrigin();

    setTimeout(() => {
      const text2 = this.add.bitmapText(
        centerX,
        startY + 60,
        'our-own-pixelfont',
        `PRESS ALT+F4`,
        32); 
      text2.setOrigin();

      setTimeout(() => {
        const text3 = this.add.bitmapText(
          centerX,
          startY + 120,
          'our-own-pixelfont',
          `AND DECIDE FOR YOURSELF!`,
          32); 
        text3.setOrigin();

        setTimeout(() => {
          const text3 = this.add.bitmapText(
            centerX,
            startY + 400,
            'our-own-pixelfont',
            `THANK YOU FOR PLAYING`,
            32); 
          text3.setOrigin();
        }, 2000)
      }, 2000)
    }, 2000)    
  }
}
