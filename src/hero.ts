import 'phaser';
import { HERO_WORDS } from './utils/hero-convenience';

export class Hero {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number){

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, HERO_WORDS.spawn);
        this.scene.add.existing(this.sprite);
        this.scene.physics.world.enableBody(this.sprite, 0);
        this.sprite.anims.play(HERO_WORDS.spawn, true);
        this.sprite.setData("speed", 200);


        if (!this.scene.input.keyboard) {
            return
        }
        const space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        space.on('down', () => {
            this.jump()
        })
        this.sprite.play(HERO_WORDS.spawn);
    }

    controls() {
        if (!this.scene.input.keyboard) {
            return
        }
        const left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        const right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        
        if (left.isDown) {
            this.moveLeft();
        }
        else if (right.isDown) {
            this.moveRight();
        }
    }

    jump() {
        console.debug(this.sprite.body!.velocity)
        if (this.sprite.body!.velocity.y === 0) {
            this.sprite.body!.velocity.y = -270;
        }
    }

    moveLeft() {
        this.sprite.body!.velocity.x = -this.sprite.getData("speed");
    }
    
    moveRight() {
        this.sprite.body!.velocity.x = this.sprite.getData("speed");
    }

    update() {
        if (this.sprite.body!.velocity.y === 0) {
            // While standing on the ground, reset horizontal velocity to zero (if user presses arrow keys, it will be set to another value in `this.controls` anyway)
            this.sprite.body!.velocity.x = 0
        }

        this.controls();

    }
}

