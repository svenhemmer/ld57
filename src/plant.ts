import 'phaser';
import { PLANT_WORDS } from './utils/plant-convenience';
import { Hero } from './hero';

export class Bitey {
    
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number){
        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, PLANT_WORDS.idle);
        this.scene.add.existing(this.sprite);
        this.scene.physics.world.enableBody(this.sprite, 0);
        this.sprite.anims.play(PLANT_WORDS.idle, true);
        const body = this.sprite.body! as Phaser.Physics.Arcade.Body;
        body.setSize(16, 24);
        body.setOffset(4, 4);
        body.setMass(1000000);
    }

    changeAnimation(which: string) {
        if (this.sprite.anims.currentAnim?.key === which) {
            return;
        }
        console.log(which)
        this.sprite.anims.play(which, true);
    }

    update(hero: Hero) {
        if (!hero || !hero.sprite || !this.sprite || !this.sprite.body) return;
        const pos = this.sprite.body!.position;
        const hPos = hero.sprite.body!.position;
        const x = hPos.x - pos.x;
        const y = hPos.y - pos.y;
        if (x > 0) {
            this.sprite.flipX = true;
        } else {
            this.sprite.flipX = false;
        }
        if (x * x + y * y < 10000) {
            this.changeAnimation(PLANT_WORDS.bite);
        } else {
            this.changeAnimation(PLANT_WORDS.idle);
        }
    }
}

