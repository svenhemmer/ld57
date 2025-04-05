import { GameScene } from './GameScene';
import { Hero } from './hero'

export class Level1 extends GameScene {

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

        const bg = lvl1.createLayer('background', tileset, 0, 0)!
        this.layers.push({
            name: 'background',
            collisionRects: addCollisionLayer('background collisions'),
            tilemapLayer: bg,
            blurEffect: bg.postFX.addBlur()
        })
        const mg = lvl1.createLayer('middleground', tileset, 0, 0)!
        this.layers.push({
            name: 'middleground',
            collisionRects: addCollisionLayer('middleground collisions'),
            tilemapLayer: mg,
            blurEffect: mg.postFX.addBlur()
        })
        const fg = lvl1.createLayer('foreground', tileset, 0, 0)!
        this.layers.push({
            name: 'foreground',
            collisionRects: addCollisionLayer('foreground collisions'),
            tilemapLayer: fg,
            blurEffect: fg.postFX.addBlur(),
        })

        this.hero = new Hero(this, 100, 50)

        this.changeLayer(1)

        super.create()
    }

    update() : void {
        this.hero!.update();
    }
}