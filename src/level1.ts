import { Hero } from './hero'

export class Level1 extends Phaser.Scene {
    image! : Phaser.GameObjects.Image;

    private hero: Hero | null = null

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
        
        const bg = lvl1.createLayer('background', tileset, 0, 0)
        const mg = lvl1.createLayer('middleground', tileset, 0, 0)
        const fg = lvl1.createLayer('foreground', tileset, 0, 0)

        bg?.postFX.addBlur()
        fg?.postFX.addBlur()

        this.hero = new Hero(this, 100, 50)
    }

    update() : void {
        this.hero!.update();
    }
}