import 'phaser';
import { HERO_WORDS } from './utils/hero-convenience';

export class Hero {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    currentAnimation: string;

    ready = false;
    speed = 200;

    constructor(scene: Phaser.Scene, x: number, y: number){

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, HERO_WORDS.spawn);
        this.scene.add.existing(this.sprite);
        this.scene.physics.world.enableBody(this.sprite, 0);
        this.currentAnimation = HERO_WORDS.spawn; 
        this.sprite.anims.play(this.currentAnimation, true);
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
        const space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        if (left.isDown) {
            this.moveLeft();
        }
        else if (right.isDown) {
            this.moveRight();
        } else if (!right.isDown) {
            this.changeAnimation(HERO_WORDS.idle)
        }
    }

    jump() {
        console.debug(this.sprite.body!.velocity)
        this.changeAnimation(HERO_WORDS.jump);
        if (this.sprite.body!.velocity.y === 0) {
            this.sprite.body!.velocity.y = -270;
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
        if (which === this.currentAnimation) { 
            return;
        }
        console.log('changing: ' + which)
        this.sprite.setTexture(which)
        this.currentAnimation = which; 
        this.sprite.anims.play(which, false);
    }

    update() {
        if (!this.ready) {
            return;
        }
        if (this.sprite.body!.velocity.y === 0) {
            // While standing on the ground, reset horizontal velocity to zero (if user presses arrow keys, it will be set to another value in `this.controls` anyway)
            this.sprite.body!.velocity.x = 0
        }
        this.controls();
    }
}

