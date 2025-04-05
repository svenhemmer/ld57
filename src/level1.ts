import { Hero } from './hero'

type Layers = 'background' | 'middleground' | 'foreground'

export class Level1 extends Phaser.Scene {
    image! : Phaser.GameObjects.Image;

    private hero: Hero | null = null

    private layers: {
        name: Layers
        collisionRects: Phaser.GameObjects.Rectangle[]
        tilemapLayer: Phaser.Tilemaps.TilemapLayer
        blurEffect?: Phaser.FX.Blur
    }[] = []

    private currentLayer: number = 1
    private currentLayerCollisions: Phaser.Physics.Arcade.Collider | null = null

    constructor() {
        super('Level 1');
    }
    preload() : void {
        this.load.image('base_tiles', 'lvl1/terrain_atlas.png')

        this.load.tilemapTiledJSON('lvl1', 'lvl1/combined.json')

        this.load.image('hero', 'hero.png')
    }
    create() : void {
        const lvl1 = this.make.tilemap({ key: 'lvl1' })

        const tileset = lvl1.addTilesetImage('terrain_atlas', 'base_tiles')

        if (!tileset) {
            throw('No tiles found for ' + 'base_tiles');
        }
        
        const addCollisionLayer = (key: string) => {
            return lvl1.getObjectLayer(key)!
                .objects
                .map(o => {
                    const rect = this.add.rectangle(o.x!, o.y!, o.width!, o.height!)
                    rect.setOrigin(0, 0)
                    return rect
                })
                .map(rect => this.physics.add.existing(rect, true))   
        }

        this.layers.push({
            name:'background',
            collisionRects: addCollisionLayer('background collisions'),
            tilemapLayer: lvl1.createLayer('background', tileset, 0, 0)!,
        })
        this.layers.push({
            name:'middleground',
            collisionRects: addCollisionLayer('middleground collisions'),
            tilemapLayer: lvl1.createLayer('middleground', tileset, 0, 0)!
        })
        this.layers.push({
            name:'foreground',
            collisionRects: addCollisionLayer('foreground collisions'),
            tilemapLayer: lvl1.createLayer('foreground', tileset, 0, 0)!
        })

        this.currentLayer = 1

        this.hero = new Hero(this, 100, 50)

        this.changeLayer(1)

        this.initControls()
    }

    changeLayer(newLayer: number) {
        const currentBlurEffect = this.layers[this.currentLayer].blurEffect
        if (currentBlurEffect) {
            this.layers![this.currentLayer].tilemapLayer.postFX.remove(currentBlurEffect)
        }
        this.currentLayer = newLayer
        this.currentLayerCollisions?.destroy()
        this.currentLayerCollisions = this.physics.add.collider(this.hero!, this.layers![this.currentLayer].collisionRects)
        this.layers[this.currentLayer].blurEffect = this.layers![this.currentLayer].tilemapLayer.postFX.addBlur()
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
        const plus = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        const minus = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        plus.on('down', () => {
            this.zoomIn()
        })
        minus.on('down', () => {
            this.zoomOut()
        })
    }

    update() : void {
        this.hero!.update();
    }
}