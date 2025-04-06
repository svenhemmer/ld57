import 'phaser';
import { HERO_WORDS } from './utils/hero-convenience';
import { AudioManagerScene } from './scenes/audio-manager.scene';

export class Hero {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    ready = false;
    speed = 200;
    jumping = false;

    runSound;

    private getSfxVolume() {
        const SFX_VOLUME_MULTIPLIER = 0.7
        const globalVolume = (this.scene.scene.get(AudioManagerScene.name) as AudioManagerScene).getCurrentVolume()
        return globalVolume * SFX_VOLUME_MULTIPLIER
    }

    constructor(scene: Phaser.Scene, x: number, y: number){

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, HERO_WORDS.spawn);
        this.scene.add.existing(this.sprite);
        this.scene.physics.world.enableBody(this.sprite, 0);
        this.sprite.anims.play(HERO_WORDS.spawn, true);
        scene.sound.play('sound_spawn', { rate: 2, volume: this.getSfxVolume() });
        this.runSound = scene.sound.add('sound_run');
        this.runSound.setLoop(true);
        this.sprite.on('animationcomplete', () => { 
            this.ready = true;
            this.changeAnimation(HERO_WORDS.idle);
        })
        if (!this.scene.input.keyboard) {
            return
        }
        const space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        space.on('down', () => {
            this.jump()
        })
        const body = this.sprite.body! as Phaser.Physics.Arcade.Body;
        body.setSize(16, 32);
        body.setOffset(8, 0)
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
        this.changeAnimation(HERO_WORDS.jump);
        if (this.sprite.body!.velocity.y === 0) {
            this.sprite.body!.velocity.y = -270;
            this.jumping = true;
            this.scene.sound.play('sound_jump', { rate: 2, volume: this.getSfxVolume() })
        }
    }

    cleanup() {
        this.runSound.stop();
        this.sprite.body!.velocity.y = 0;
        this.sprite.body!.velocity.x = 0;
    }

    die(callback: () => void) {
        this.runSound.stop();
        this.ready = false;
        this.sprite.body!.velocity.y = 0;
        this.sprite.body!.velocity.x = 0;
        this.scene.sound.play('sound_die', { rate: 2, volume: this.getSfxVolume() });
        this.changeAnimation(HERO_WORDS.die);
        this.sprite.on('animationcomplete', () => { 
            callback();
        })
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
        if (this.sprite.anims.currentAnim?.key === which) {
            return;
        }
        if (which === HERO_WORDS.run) {
            if (!this.runSound.isPlaying) {
                this.runSound.play({ volume: this.getSfxVolume() });
            }
        } else {
            this.runSound.stop();
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

