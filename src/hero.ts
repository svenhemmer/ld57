import 'phaser';
import { HERO_WORDS } from './utils/hero-convenience';

export class Hero {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    ready = false;
    speed = 200;
    jumping = false;

    constructor(scene: Phaser.Scene, x: number, y: number){

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, HERO_WORDS.spawn);
        this.scene.add.existing(this.sprite);
        this.scene.physics.world.enableBody(this.sprite, 0);
        this.sprite.anims.play(HERO_WORDS.spawn, true);
        this.sprite.on('animationcomplete', () => { 
            this.ready = true;
            this.changeAnimation(HERO_WORDS.run);
        })

        console.log(this.sprite.anims)

        if (!this.scene.input.keyboard) {
            return
        }
        const space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        space.on('down', () => {
            this.jump()
        })
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
        } else if (!this.jumping) {
            this.changeAnimation(HERO_WORDS.idle)
        }
    }

    jump() {
        console.debug(this.sprite.body!.velocity)
        this.changeAnimation(HERO_WORDS.jump);
        if (this.sprite.body!.velocity.y === 0) {
            this.sprite.body!.velocity.y = -270;
            this.jumping = true;
        }
    }

    moveLeft() {
        this.sprite.setFlipX(true);
        this.changeAnimation(HERO_WORDS.run);
        this.sprite.body!.velocity.x = -this.speed;
    }
    
    moveRight() {
        this.sprite.setFlipX(false)
        this.changeAnimation(HERO_WORDS.run);
        this.sprite.body!.velocity.x = this.speed;
    }

    changeAnimation(which: string) {
        if (this.jumping) { 
            return;
        }
        this.sprite.anims.play(which, true);
    }

    update() {
        if (!this.ready) {
            return;
        }
        if (this.sprite.body!.velocity.y === 0) {
            // While standing on the ground, reset horizontal velocity to zero (if user presses arrow keys, it will be set to another value in `this.controls` anyway)
            this.sprite.body!.velocity.x = 0
            this.jumping = false;
        }
        this.controls();
    }
}

