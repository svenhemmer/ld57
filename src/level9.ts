import { GameScene } from './GameScene';
import { Hero } from './hero';

export class Level9 extends GameScene {
  constructor() {
    super(Level9.name);
  }

  preload(): void {
    this.load.image('base_tiles', 'tileset.png');

    this.load.tilemapTiledJSON('lvl9', 'lvl9/map.json');

    this.load.image('hero', 'hero.png');
  }

  create(): void {
    this.tilemap = this.make.tilemap({ key: 'lvl9' });

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
    const fg = this.tilemap.createLayer('Foreground', tileset, 0, 0)!;
    this.layers.push({
      name: 'foreground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Foreground collision'),
      tilemapLayer: fg,
      blurEffect: fg.postFX.addBlur(),
    });
    
    this.hero = new Hero(this, 100, 250);

    this.changeLayer(0);

    super.create();
  }

  update(): void {
    this.hero!.update();
  }
}
