import 'phaser';

export const LEVEL_GOAL_HOVERING = {
    textureName: "hovering",
    key: "hovering",
    start: 0,
    end: 6,
    frameRate: 4,
    delay: 500,
    repeat: -1,
}

export class LevelGoal {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number){

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, "hovering");
        this.scene.add.existing(this.sprite);
        // this.scene.physics.world.enableBody(this.sprite, 0);
        this.sprite.anims.play("hovering", true);
    }

}

