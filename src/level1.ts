export class Level1 extends Phaser.Scene {
    image! : Phaser.GameObjects.Image;
    constructor() {
        super('Level 1');
    }
    preload() : void {
        this.load.image('base_tiles', 'lvl1/terrain_atlas.png')

        this.load.tilemapTiledJSON('background', 'lvl1/background.json')
        this.load.tilemapTiledJSON('middleground', 'lvl1/middleground.json')
        this.load.tilemapTiledJSON('foreground', 'lvl1/foreground.json')
    }
    create() : void {
        const background = this.make.tilemap({ key: 'background' })
        const middleground = this.make.tilemap({ key: 'middleground' })
        const foreground = this.make.tilemap({ key: 'foreground' })

        const tileset = background.addTilesetImage('terrain_atlas', 'base_tiles')

        if (!tileset) {
            throw('No tiles found for ' + 'base_tiles');
        }
        
        background.createLayer('Tile Layer 1', tileset, 0, 0)
        middleground.createLayer('Tile Layer 1', tileset, 0, 0)
        foreground.createLayer('Tile Layer 1', tileset, 0, 0)
    
    }
    update() : void {
    }
}