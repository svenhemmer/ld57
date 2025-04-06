import { GameScene } from './GameScene';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level5 extends GameScene {
  constructor() {
    super(Level5.name);
  }

  preload(): void {
    getLoaderConvenience(this)
      .initLoader()
      .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl5', path: 'lvl5/lvl5.json'})
      .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
    this.tilemap = this.make.tilemap({ key: 'lvl5' });

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
    this.playerPlants()

    this.changeLayer(1);

    super.create();
  }
}
