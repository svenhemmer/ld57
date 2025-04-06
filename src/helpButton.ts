import { GameScene } from "./GameScene";
import { ControlsScene } from "./scenes/controls.scene";


export class HelpButton {
    constructor(private scene: GameScene) {}

    create() {
        if (!this.scene.input.keyboard) {
            return
        }
        const h = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        h.on('down', () => {
            // @ts-ignore
            globalThis.previousScene = this.scene
            this.scene.scene.switch(ControlsScene.name)
        })
    }

    update() {
        const text = this.scene.add.bitmapText(
            50,
            this.scene.scale.height - 100,
            'our-own-pixelfont',
            "PRESS H\nFOR HELP",
            24
        )
        text.setScrollFactor(0)
    }
}