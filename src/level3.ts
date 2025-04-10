import { GameScene } from './GameScene';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level3 extends GameScene {
  constructor() {
    super(Level3.name);
  }

  preload(): void {
    getLoaderConvenience(this)
      .initLoader()
      .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl3', path: 'lvl3/map.json'})
      .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
    this.tilemap = this.make.tilemap({ key: 'lvl3' });

    const tileset = this.tilemap.addTilesetImage('tileset', 'base_tiles');

    if (!tileset) {
      throw 'No tiles found';
    }

    this.layers = []

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
    this.placePlants()

    this.changeLayer(1);

    super.create();
  }
}
