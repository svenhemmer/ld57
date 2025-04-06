import 'phaser';

export const ENTRY_GATE_HOVERING = {
    textureName: "entry-gate-hovering",
    key: "entry-gate-hovering",
    start: 0,
    end: 9,
    frameRate: 4,
    delay: 200,
    // repeat: -1,
}

export class EntryGate {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number){

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, "entry-gate-hovering");
        this.scene.add.existing(this.sprite);
        this.scene.physics.world.enableBody(this.sprite, 0);
        this.sprite.anims.play("entry-gate-hovering", true);
    }

}

