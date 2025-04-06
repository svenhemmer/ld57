import { GameScene } from './GameScene';
import { Hero } from './hero';
import { getLoaderConvenience } from './utils/loader';

export class Level4 extends GameScene {
  constructor() {
    super(Level4.name);
  }

  preload(): void {
    getLoaderConvenience(this)
      .initLoader()
      .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl4', path: 'lvl4/map.json'})
      .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    this.tilemap = this.make.tilemap({ key: 'lvl4' });

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
