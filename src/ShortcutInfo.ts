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

        const text = this.scene.add.bitmapText(
            40,
            this.scene.scale.height - 100,
            'our-own-pixelfont',
            "PRESS H\nFOR HELP",
            20
        )
        text.setScrollFactor(0)

        const text2 = this.scene.add.bitmapText(
            230,
            this.scene.scale.height - 100,
            'our-own-pixelfont',
            "PRESS M\nTO MUTE SOUND",
            20
        )
        text2.setScrollFactor(0)

        const text3 = this.scene.add.bitmapText(
            490,
            this.scene.scale.height - 100,
            'our-own-pixelfont',
            "PRESS V\nTO CHANGE VOLUME",
            20
        )
        text3.setScrollFactor(0)
    }

    update() {
        
    }
}