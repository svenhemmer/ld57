export const buttonStyleConfig = (
  fontSize = 40,
): Parameters<Phaser.GameObjects.GameObjectFactory["text"]>["3"] => ({
  fontFamily: "Bitfont",
  backgroundColor: "#0a0",
  fontSize: `${fontSize}px`,
});

export function renderPressAnyKeyToContinue(scene: Phaser.Scene, x: number, y: number) {
  const pressToContinue = scene.add.bitmapText(
    x,
    y,
    'our-own-pixelfont',
    "PRESS ANY KEY TO CONTINUE",
    32); 
  pressToContinue.setOrigin();
  const underline = scene.add.line(
    pressToContinue.x,
    pressToContinue.y + pressToContinue.height / 2,
    0,
    0,
    500,
    0,
    0x000000
  )
  underline.setLineWidth(2)
}