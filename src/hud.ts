import { GameScene } from "./GameScene";
import { ShortcutInfo } from "./ShortcutInfo";
import { LayerIndicator } from "./LayerIndicator";

export class Hud extends Phaser.Scene {
    private layerIndicator?: LayerIndicator
    private shortcutInfo?: ShortcutInfo
    private gameScene?: GameScene

    constructor() { 
        super(Hud.name)
    }

    init(data: any) {
        this.gameScene = data.currentGameScene
        this.scene.moveAbove(this.gameScene!)
        this.layerIndicator = new LayerIndicator(this, this.gameScene!)
        this.shortcutInfo = new ShortcutInfo(this, this.gameScene!)
    }

    create() {
        this.shortcutInfo?.create()
    }

    update() {
        this.layerIndicator?.update()
        this.shortcutInfo?.update()
    }
}