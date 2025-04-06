import { GameScene } from './GameScene';
import { Hero } from './hero';

export class Level6 extends GameScene {
  constructor() {
    super(Level6.name);
  }

  preload(): void {
    this.load.image('base_tiles', 'tileset.png');

    this.load.tilemapTiledJSON('lvl6', 'lvl6/map.json');

    this.load.image('hero', 'hero.png');
  }

  create(): void {
    this.tilemap = this.make.tilemap({ key: 'lvl6' });

    const tileset = this.tilemap.addTilesetImage('tileset', 'base_tiles');

    if (!tileset) {
      throw 'No tiles found';
    }

    this.layers = []

    const vbg = this.tilemap.createLayer('Very Background', tileset, 0, 0)!;
    this.layers.push({
      name: 'verybackground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Very Background collision'),
      tilemapLayer: vbg,
      blurEffect: vbg.postFX.addBlur(),
    });
    const bg = this.tilemap.createLayer('Background', tileset, 0, 0)!;
    this.layers.push({
      name: 'background',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Background collision'),
      tilemapLayer: bg,
      blurEffect: bg.postFX.addBlur(),
    });
    const mg = this.tilemap.createLayer('Middleground', tileset, 0, 0)!;
    this.layers.push({
      name: 'middleground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Middleground collision'),
      tilemapLayer: mg,
      blurEffect: mg.postFX.addBlur(),
    });
    const fg = this.tilemap.createLayer('Foreground', tileset, 0, 0)!;
    this.layers.push({
      name: 'foreground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Foreground collision'),
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
