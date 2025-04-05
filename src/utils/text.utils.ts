export const buttonStyleConfig = (
  fontSize = 40,
): Parameters<Phaser.GameObjects.GameObjectFactory["text"]>["3"] => ({
  fontFamily: "Bitfont",
  backgroundColor: "#0a0",
  fontSize: `${fontSize}px`,
});
