import { GameScene } from './GameScene';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level8 extends GameScene {
  constructor() {
    super(Level8.name);
  }

  preload(): void {
    getLoaderConvenience(this)
              .initLoader()
              .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl8', path: 'lvl8/map.json'})
              .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
    this.tilemap = this.make.tilemap({ key: 'lvl8' });

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
    
    this.placePlayer()
    this.placePlants()

    this.changeLayer(0);

    super.create();
  }
}
