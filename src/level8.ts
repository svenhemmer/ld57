import { GameScene } from './GameScene';
import { Hero } from './hero';

export class Level8 extends GameScene {
  constructor() {
    super(Level8.name);
  }

  preload(): void {
    this.load.image('base_tiles', 'tileset.png');

    this.load.tilemapTiledJSON('lvl8', 'lvl8/map.json');

    this.load.image('hero', 'hero.png');
  }

  create(): void {
    this.tilemap = this.make.tilemap({ key: 'lvl8' });

    const tileset = this.tilemap.addTilesetImage('tileset', 'base_tiles');

    if (!tileset) {
      throw 'No tiles found';
    }

    this.layers = []

    const bg = this.tilemap.createLayer('Background', tileset, 0, 0)!;
    this.layers.push({
      name: 'background',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Background collision'),
      tilemapLayer: bg,
      blurEffect: bg.postFX.addBlur(),
    });
    
    console.debug(bg.postFX, this.layers)

    this.hero = new Hero(this, 100, 250);

    this.changeLayer(0);

    super.create();
  }

  update(): void {
    this.hero!.update();
  }
}
