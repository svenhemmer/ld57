import { GameScene } from './GameScene';
import { Hero } from './hero';

export class Level1 extends GameScene {
  constructor() {
    super(Level1.name);
  }

  preload(): void {
    this.load.image('base_tiles', 'lvl1/tileset.png');

    this.load.tilemapTiledJSON('lvl1', 'lvl1/combined.json');

    this.load.image('hero', 'hero.png');
  }

  create(): void {
    this.tilemap = this.make.tilemap({ key: 'lvl1' });

    const tileset = this.tilemap.addTilesetImage('tileset', 'base_tiles');

    if (!tileset) {
      throw 'No tiles found';
    }

    const bg = this.tilemap.createLayer('background', tileset, 0, 0)!;
    this.layers.push({
      name: 'background',
      collisionRects: this.addCollisionLayer(this.tilemap, 'background collisions'),
      tilemapLayer: bg,
      blurEffect: bg.postFX.addBlur(),
    });
    const mg = this.tilemap.createLayer('middleground', tileset, 0, 0)!;
    this.layers.push({
      name: 'middleground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'middleground collisions'),
      tilemapLayer: mg,
      blurEffect: mg.postFX.addBlur(),
    });
    const fg = this.tilemap.createLayer('foreground', tileset, 0, 0)!;
    this.layers.push({
      name: 'foreground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'foreground collisions'),
      tilemapLayer: fg,
      blurEffect: fg.postFX.addBlur(),
    });

    this.hero = new Hero(this, 100, 50);

    this.changeLayer(1);

    super.create();
  }

  update(): void {
    this.hero!.update();
  }
}
