import 'phaser';


export class Hero extends Phaser.GameObjects.Sprite {
    declare body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number){

        super(scene, x, y, 'hero');

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("speed", 200);

        this.scene.add.existing(this);

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
        }
    }

    jump() {
        console.debug(this.body.velocity)
        if (this.body.velocity.y === 0) {
            this.body.setVelocityY(-200);
        }
    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }
    
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update() {
        if (this.body.velocity.y === 0) {
            // While standing on the ground, reset horizontal velocity to zero (if user presses arrow keys, it will be set to another value in `this.controls` anyway)
            this.body.setVelocityX(0)
        }

        this.controls();

    }
}

