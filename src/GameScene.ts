import { Hero } from './hero'
import { wasLastLevel } from './levels'
import { EndScene } from './scenes/end.scene'
import { SuccessScene } from './scenes/success.scene'
import { Hud } from './hud'
import { LevelGoal } from './LevelGoal'
import { EntryGate } from './EntryGate'
import { Bitey } from './plant'

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
    entryGate?: EntryGate
    plantsPerLayer: { plant: Bitey, blurEffect?: Phaser.FX.Blur }[][] = [];
    onLayerChange: () => void = () => {}

    currentLayer: number = 1
    private currentLayerCollisions: Phaser.Physics.Arcade.Collider | null = null
    private otherColliders: Phaser.Physics.Arcade.Collider[] = [];

    constructor(name: string) {
        super(name);
    }

    levelGoal?: LevelGoal
    levelGoalLayer: number = 0
    levelGoalBlurEffect?: Phaser.FX.Blur

    placePlayer() {
        this.layers
            .flatMap(layer => layer.collisionRects)
            .forEach(rect => {
                if (rect.data?.values?.Start) {
                    console.debug('found start → render sprite')
                    this.entryGate = new EntryGate(this, rect.x + rect.width / 2, rect.y + rect.height / 2)
                    this.hero = new Hero(this, rect.x + rect.width / 2, rect.y + rect.height / 2);
                }
            })
    }

    placePlants() {
        this.plantsPerLayer = []
        for (let i = 0; i < this.layers.length; i++) {
            this.plantsPerLayer.push([])
            for (let rect of this.layers[i].collisionRects) {
                if (rect.data?.values?.Plant) {
                    console.debug('found Plant → render sprite')
                    this.plantsPerLayer[i].push({
                        plant: new Bitey(this, rect.x + rect.width, rect.y + rect.height)
                    })
                }
            }
        }
        console.debug("→→", this.plantsPerLayer, this.otherColliders)
    }

    create() {
        for (let i = 0; i < this.layers.length; i++) {
            for (let rect of this.layers[i].collisionRects) {
                if (rect.data?.values?.Goal) {
                    console.debug('found goal → render sprite')
                    this.levelGoal = new LevelGoal(this.scene.scene, rect.x + rect.width / 2, rect.y + rect.height / 2)
                    this.levelGoalLayer = i
                }
            }
        }
        this.computeLevelGoalBlurryness()
        this.computePlantBlurryness()
        this.initControls()

        // this.cameras.main.setBounds(0, 0, this.tilemap!.widthInPixels, this.tilemap!.heightInPixels, true);
        this.cameras.main.startFollow(this.hero!.sprite)

        this.scene.launch(Hud.name, { currentGameScene: this })

        const bg = this.add.image(0, 0, 'bg')
        bg.setOrigin(0)
        const desiredHeight = this.layers[0].tilemapLayer.height + 700
        const desiredWidth = this.layers[0].tilemapLayer.width + 700
        const scaleFactor = Math.max(
            desiredWidth / bg.width,
            desiredHeight / bg.height
        )
        bg.setScale(scaleFactor)
        bg.setX(-350)
        bg.setY(-350)
        bg.setDepth(-100)
    }

    computeLevelGoalBlurryness() {
        console.debug(this.currentLayer, this.levelGoalLayer)
        if (this.currentLayer !== this.levelGoalLayer) {
            this.levelGoalBlurEffect = this.levelGoal?.sprite?.postFX?.addBlur()
        }
        else if (this.levelGoalBlurEffect) {
            this.levelGoal?.sprite?.postFX?.remove(this.levelGoalBlurEffect)
        }
    }

    computePlantBlurryness() {
        // Remove existing blurs on all layers
        this.plantsPerLayer.flatMap(layer => layer).forEach((plantInfo, _i) => {
            if (plantInfo.blurEffect) {
                plantInfo.plant.sprite.postFX.remove(plantInfo.blurEffect)
            }
        })
        // Add new blur to all inactive layers
        this.plantsPerLayer.forEach((layer, i) => {
            layer.forEach(plantInfo => {
                if (i !== this.currentLayer) {
                    plantInfo.blurEffect = plantInfo.plant.sprite.postFX.addBlur()
                }
            })
        })
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
        this.otherColliders.forEach(col => col.destroy())
        this.otherColliders = [];
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
        
        this.plantsPerLayer.forEach((layer, i) => {
            layer.forEach(plant => {
                this.otherColliders.push(
                    this.physics.add.collider(plant.plant.sprite, this.layers![newLayer].collisionRects),
                )
                if (newLayer === i) {
                    this.otherColliders.push(
                        this.physics.add.collider(this.hero!.sprite, plant.plant.sprite, () => {
                            this.onPlayerDies();
                        })
                    )
                }
            });
        })
        this.otherColliders.push(
            this.physics.add.collider(this.entryGate!.sprite, this.layers![newLayer].collisionRects)
        )
        this.currentLayer = newLayer

        this.computeLevelGoalBlurryness()
        this.computePlantBlurryness()

        this.onLayerChange()
        this.cameras.main.zoomEffect.start(defaultZoom * zoomFactor**this.currentLayer, 400)
    }

    // 0 → 1
    // 1 → 1 * factor
    // 2 → 1 * factor * factor

    onPlayerReachesGoal() {
        console.debug('Level finished!')
        console.debug(this.hero)
        this.hero?.cleanup();
        this.endLevel()
    }

    isDying = false
    onPlayerDies() {
        if (this.isDying) {
            return
        }
        console.debug('Level you died!')
        const callback = () => {
            this.hero = null;
            this.restartLevel();
            this.isDying = false
        };
        this.isDying = true
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
        if (this.hero === null) return;
        this.hero.update();
        this.plantsPerLayer.flatMap(layer => layer).forEach(plant => plant.plant.update(this.hero!));
    }
}