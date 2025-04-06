import { Hero } from './hero'
import { wasLastLevel } from './levels'
import { EndScene } from './scenes/end.scene'
import { SuccessScene } from './scenes/success.scene'
import { Hud } from './hud'

type Layer = {
    name: string
    collisionRects: Phaser.GameObjects.Rectangle[]
    tilemapLayer: Phaser.Tilemaps.TilemapLayer
    blurEffect?: Phaser.FX.Blur
}

const zoomFactor = 1.1
const defaultZoom = 1.5

export class GameScene extends Phaser.Scene {
    layers: Layer[] = []
    tilemap?: Phaser.Tilemaps.Tilemap
    hero: Hero | null = null

    currentLayer: number = 1
    private currentLayerCollisions: Phaser.Physics.Arcade.Collider | null = null

    constructor(name: string) {
        super(name);
    }

    create() {
        this.initControls()

        // this.cameras.main.setBounds(0, 0, this.tilemap!.widthInPixels, this.tilemap!.heightInPixels, true);
        this.cameras.main.startFollow(this.hero!.sprite)

        this.scene.launch(Hud.name, { currentGameScene: this })
    }

    changeLayer(newLayer: number) {
        // Remove existing blurs on all layers
        this.layers.forEach((_layer, i) => {
            this.layers[i].tilemapLayer.postFX.remove(this.layers[i].blurEffect!)
        })
        // Add new blur to all layers
        this.layers.forEach((_layer, i) => {
            this.layers[i].blurEffect = this.layers[i].tilemapLayer.postFX.addBlur()
        })
        // unblur active layer
        this.layers[newLayer].tilemapLayer.postFX.remove(this.layers[newLayer].blurEffect!)

        this.currentLayerCollisions?.destroy()
        console.debug(this.layers![newLayer].collisionRects)
        this.currentLayerCollisions = this.physics.add.collider(this.hero!.sprite, this.layers![newLayer].collisionRects, (_, o2) => {
            const second = o2 as Phaser.Types.Physics.Arcade.GameObjectWithBody;
            if (second.data?.values?.Goal) {
                this.onPlayerReachesGoal()
            }

            if (second.data?.values?.Death) {
                this.onPlayerDies()
            }
        })
        this.currentLayer = newLayer


        this.cameras.main.zoomEffect.start(defaultZoom * zoomFactor**this.currentLayer, 400)
    }

    // 0 → 1
    // 1 → 1 * factor
    // 2 → 1 * factor * factor

    onPlayerReachesGoal() {
        console.debug('Level finished!')
        this.hero?.cleanup();
        this.endLevel()
    }

    onPlayerDies() {
        console.debug('Level you died!')
        const callback = () => {
            this.hero = null;
            this.restartLevel();
        };
        this.hero?.die(callback);
    }

    zoomIn() {
        const newLayer = Math.max(this.currentLayer - 1 , 0)
        if (newLayer === this.currentLayer) {
            return
        }

        this.changeLayer(newLayer)
    }

    zoomOut() {
        const newLayer = Math.min(this.currentLayer + 1 , this.layers.length - 1)
        if (newLayer === this.currentLayer) {
            return
        }

        this.changeLayer(newLayer)
    }

    initControls() {
        if (!this.input.keyboard) {
            return
        }
        const up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        const down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        up.on('down', () => {
            this.zoomIn()
        })
        down.on('down', () => {
            this.zoomOut()
        })
    }

    endLevel() {
        this.scene.stop(Hud.name)
        if (wasLastLevel()) {
            this.scene.start(EndScene.name)
            return
        }
        this.scene.start(SuccessScene.name);
    }

    restartLevel() {
        // TODO Show failure screen?

        this.scene.restart()
    }

    addCollisionLayer(tilemap: Phaser.Tilemaps.Tilemap, key: string) {
        return tilemap
          .getObjectLayer(key)!
          .objects.map((o) => {
            const rect = this.add.rectangle(o.x!, o.y!, o.width!, o.height!);
            if (o.properties) {
              for (let { name, value } of o.properties) {
                console.debug({ name, value })
                rect.setData(name, value)
              }
            }
            rect.setOrigin(0, 0);
            return rect;
          })
          .map((rect) => this.physics.add.existing(rect, true));
      };
    
    update() {
        this.hero?.update()
    }
}