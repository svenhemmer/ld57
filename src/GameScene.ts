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

export class GameScene extends Phaser.Scene {
    layers: Layer[] = []
    tilemap?: Phaser.Tilemaps.Tilemap
    hero: Hero | null = null

    private hud: Hud

    currentLayer: number = 1
    private currentLayerCollisions: Phaser.Physics.Arcade.Collider | null = null

    constructor(name: string) {
        super(name);
        this.hud = new Hud(this)
    }

    create() {
        this.initControls()
        this.hud.create()

        // this.cameras.main.setBounds(0, 0, this.tilemap!.widthInPixels, this.tilemap!.heightInPixels, true);
        this.cameras.main.startFollow(this.hero!.sprite)
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

        this.hud.update()
    }

    onPlayerReachesGoal() {
        console.debug('Level finished!')
        this.endLevel()
    }

    onPlayerDies() {
        console.debug('Level you died!')
        this.restartLevel()
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
}