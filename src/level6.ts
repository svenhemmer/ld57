import { GameScene } from './GameScene';
import { Hero } from './hero';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level6 extends GameScene {
  constructor() {
    super(Level6.name);
  }

  preload(): void {
    getLoaderConvenience(this)
          .initLoader()
          .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl6', path: 'lvl6/map.json'})
          .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
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

    this.placePlayer()

    this.changeLayer(1);

    super.create();
  }
}
