import { GameScene } from './GameScene';
import { getAnimatorConvenience } from './utils/animator';
import { getLoaderConvenience } from './utils/loader';

export class Level9 extends GameScene {
  constructor() {
    super(Level9.name);
  }

  preload(): void {
    getLoaderConvenience(this)
          .initLoader()
          .prepareLevel({ name: 'base_tiles', path: 'tileset.png' }, { name: 'lvl9', path: 'lvl9/map.json'})
          .getLoader().load((progress: number) => {console.log(progress)});
  }

  create(): void {
    getAnimatorConvenience(this);
    this.tilemap = this.make.tilemap({ key: 'lvl9' });

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
    const fg = this.tilemap.createLayer('Foreground', tileset, 0, 0)!;
    this.layers.push({
      name: 'foreground',
      collisionRects: this.addCollisionLayer(this.tilemap, 'Foreground collision'),
      tilemapLayer: fg,
      blurEffect: fg.postFX.addBlur(),
    });
    
    this.placePlayer()
    this.placePlants()

    this.changeLayer(0);

    super.create();
  }
}
