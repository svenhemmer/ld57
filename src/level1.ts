import { GameScene } from './GameScene';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level1 extends GameScene {
  constructor() {
    super(Level1.name);
  }

  preload(): void {
    getLoaderConvenience(this)
      .initLoader()
      .prepareLevel({ name: 'base_tiles', path: 'lvl1/tileset.png' }, { name: 'lvl1', path: 'lvl1/combined.json'})
      .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
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

    this.placePlayer()

    this.changeLayer(1);

    super.create();
  }
}
