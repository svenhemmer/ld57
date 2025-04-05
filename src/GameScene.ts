import { Hero } from './hero'

type Layer = {
    name: string
    collisionRects: Phaser.GameObjects.Rectangle[]
    tilemapLayer: Phaser.Tilemaps.TilemapLayer
    blurEffect?: Phaser.FX.Blur
}

export class GameScene extends Phaser.Scene {
    layers: Layer[] = []
    hero: Hero | null = null


    private currentLayer: number = 1
    private currentLayerCollisions: Phaser.Physics.Arcade.Collider | null = null

    constructor(name: string) {
        super(name);
    }

    create() {
        this.initControls()
    }

    changeLayer(newLayer: number) {
        // Remove existing blurs on all layers
        this.layers.forEach((_layer, i) => {
            this.layers[i].tilemapLayer.postFX.remove(this.layers[i].blurEffect!)
        })
        // Add new blur to all layers
        this.layers.forEach((_layer, i) => {
            this.layers[i].blurEffect = this.layers[i].tilemapLayer.postFX.addBlur()
        })
        // unblur active layer
        this.layers[newLayer].tilemapLayer.postFX.remove(this.layers[newLayer].blurEffect!)

        this.currentLayerCollisions?.destroy()
        this.currentLayerCollisions = this.physics.add.collider(this.hero!, this.layers![newLayer].collisionRects)
        this.currentLayer = newLayer
    }

    zoomIn() {
        const newLayer = Math.max(this.currentLayer - 1 , 0)
        if (newLayer === this.currentLayer) {
            return
        }

        this.changeLayer(newLayer)
    }

    zoomOut() {
        const newLayer = Math.min(this.currentLayer + 1 , this.layers.length - 1)
        if (newLayer === this.currentLayer) {
            return
        }

        this.changeLayer(newLayer)
    }

    initControls() {
        if (!this.input.keyboard) {
            return
        }
        const up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        const down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        up.on('down', () => {
            this.zoomIn()
        })
        down.on('down', () => {
            this.zoomOut()
        })
    }

}