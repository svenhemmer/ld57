import { ControlsScene } from "./scenes/controls.scene";
import { GameScene } from "./GameScene";
import { Hud } from "./hud";


export class ShortcutInfo {
    constructor(private scene: Phaser.Scene, private gameScene: GameScene) {
    }

    create() {
        if (!this.scene.input.keyboard) {
            return
        }
        const h = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        h.on('down', () => {
            // @ts-ignore
            globalThis.previousScene = this.gameScene
            this.scene.scene.setVisible(false, Hud.name)
            this.gameScene.scene.switch(ControlsScene.name)
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

        const text2 = this.scene.add.bitmapText(
            350,
            this.scene.scale.height - 100,
            'our-own-pixelfont',
            "PRESS M\nTO MUTE SOUND",
            24
        )
        text2.setScrollFactor(0)
    }
}