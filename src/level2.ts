import { GameScene } from './GameScene';
import { Hero } from './hero';

export class Level2 extends GameScene {
  constructor() {
    super(Level2.name);
  }

  preload(): void {
    this.load.image('base_tiles', 'tileset.png');

    this.load.tilemapTiledJSON('lvl2', 'lvl2/map.json');

    this.load.image('hero', 'hero.png');
  }

  create(): void {
    this.tilemap = this.make.tilemap({ key: 'lvl2' });

    const tileset = this.tilemap.addTilesetImage('tileset', 'base_tiles');

    if (!tileset) {
      throw 'No tiles found';
    }

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
