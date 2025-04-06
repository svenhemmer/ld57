import { GameScene } from "./GameScene";

const positionX = 50
const positionY = 50

export class LayerIndicator {
    constructor(private scene: GameScene) {
    }

    update() {
        console.info(`We're now on layer ${this.scene.currentLayer}`)

        const heading = this.scene.add.bitmapText(
            positionX - 32,
            positionY,
            'our-own-pixelfont',
            "LAYER",
            24
        )
        heading.setScrollFactor(0)

        for (let i = 0; i < this.scene.layers.length; i++) {
            let color = 0x666666
            if (i === this.scene.currentLayer) {
                color = 0x00AA00
            }
            const rect = this.scene.add.rectangle(positionX + i * 5, positionY + 64 + i * 5, 50, 50, color)
            rect.setScrollFactor(0)
        }
    }
}