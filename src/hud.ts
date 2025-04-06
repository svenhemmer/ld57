import { GameScene } from "./GameScene";
import { HelpButton } from "./helpButton";
import { LayerIndicator } from "./LayerIndicator";

export class Hud {
    private layerIndicator: LayerIndicator
    private helpButton: HelpButton

    constructor(scene: GameScene) {
        this.layerIndicator = new LayerIndicator(scene)
        this.helpButton = new HelpButton(scene)
    }

    create() {
        this.helpButton.create()
    }

    update() {
        this.layerIndicator.update()
        this.helpButton.update()
    }
}