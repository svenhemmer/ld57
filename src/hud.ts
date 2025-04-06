import { GameScene } from "./GameScene";
import { HelpButton } from "./helpButton";
import { LayerIndicator } from "./LayerIndicator";

export class Hud extends Phaser.Scene {
    private layerIndicator?: LayerIndicator
    private helpButton?: HelpButton
    private gameScene?: GameScene

    constructor() { 
        super(Hud.name)
    }

    init(data: any) {
        this.gameScene = data.currentGameScene
        this.scene.moveAbove(this.gameScene!)
        this.layerIndicator = new LayerIndicator(this, this.gameScene!)
        this.helpButton = new HelpButton(this, this.gameScene!)
    }

    create() {
        this.helpButton?.create()
    }

    update() {
        this.layerIndicator?.update()
        this.helpButton?.update()
    }
}