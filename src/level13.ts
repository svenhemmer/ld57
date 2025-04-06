import { GameScene } from './GameScene';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level13 extends GameScene {
  constructor() {
    super(Level13.name);
  }

  preload(): void {
    getLoaderConvenience(this)
          .initLoader()
          .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl13', path: 'lvl13/map.json'})
          .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
    this.tilemap = this.make.tilemap({ key: 'lvl13' });

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
    this.playerPlants()

    this.changeLayer(0);

    super.create();
  }
}
