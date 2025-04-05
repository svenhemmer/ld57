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
    }

    controls() {
        if (!this.scene.input.keyboard) {
            return
        }
        const left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        const right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        const up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        const down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        if (down.isDown) {
            this.moveDown();
        }
        else if (up.isDown) {
            this.moveUp();
        }
        
        if (left.isDown) {
            this.moveLeft();
        }
        else if (right.isDown) {
            this.moveRight();
        }
    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed");
    }
    
    moveDown() {
        this.body.velocity.y = this.getData("speed");
    }
    
    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }
    
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update() {
        this.body.setVelocity(0, 0);
        this.controls();

        this.x = Phaser.Math.Clamp(this.x, 0, Number(this.scene.game.config.width));
        this.y = Phaser.Math.Clamp(this.y, 0, Number(this.scene.game.config.height));
    }
}

