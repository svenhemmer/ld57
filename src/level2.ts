import { GameScene } from './GameScene';
import { Hero } from './hero';

export class Level2 extends GameScene {
  constructor() {
    super(Level2.name);
  }

  preload(): void {
    this.load.image('base_tiles', 'lvl1/tileset.png');
    this.load.image('tree_tiles', 'lvl2/Tree 1.png');

    this.load.tilemapTiledJSON('lvl2', 'lvl2/map.json');

    this.load.image('hero', 'hero.png');
  }

  create(): void {
    const lvl2 = this.make.tilemap({ key: 'lvl2' });

    const tileset = lvl2.addTilesetImage('tileset', 'base_tiles');
    const tree_tileset = lvl2.addTilesetImage('Tree', 'tree_tiles');

    if (!tileset || !tree_tileset) {
      throw 'No tiles found';
    }

    const mg = lvl2.createLayer('Middleground', tileset, 0, 0)!;
    this.layers.push({
      name: 'middleground',
      collisionRects: this.addCollisionLayer(lvl2, 'Middleground collision'),
      tilemapLayer: mg,
      blurEffect: mg.postFX.addBlur(),
    });
    const fg = lvl2.createLayer('Foreground', [tileset, tree_tileset], 0, 0)!;
    this.layers.push({
      name: 'foreground',
      collisionRects: this.addCollisionLayer(lvl2, 'Foreground collision'),
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
