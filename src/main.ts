import 'phaser';
import './style.css';
import { Level1 } from './level1';
import { Level2 } from './level2';

class PlayGame extends Phaser.Scene {
    image! : Phaser.GameObjects.Image;
    constructor() {
        super('PlayGame');
    }
    preload() : void {
        this.load.image('logo', 'phaser3-logo.png');    
    }
    create() : void {
        this.image = this.add.image(400, 300, 'logo');
    }
    update() : void {
        this.image.rotation += 0.01;   
    }
}
 
let configObject : Phaser.Types.Core.GameConfig = {
    backgroundColor: '#FFF',
    scale : {
        mode        : Phaser.Scale.FIT,
        autoCenter  : Phaser.Scale.CENTER_BOTH,
        parent      : 'thegame',
        width       : 800,
        height      : 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: Level2
};
 
new Phaser.Game(configObject);