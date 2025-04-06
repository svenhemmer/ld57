import { Level1 } from "./level1";
import { Level2 } from "./level2";

// lists levels in their order
export const levels = [
    Level2,
    Level1
]

let currentLevel = -1

export function gotoNextLevel(scene: Phaser.Scenes.ScenePlugin) {
    const nextLevel = currentLevel + 1
    if (nextLevel > levels.length - 1) {
        console.debug('Game Finished — We should show end screen')
    }
    currentLevel = nextLevel

    scene.start(levels[currentLevel].name);
}
