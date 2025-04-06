import { Level1 } from "./level1";
import { Level2 } from "./level2";
import { Level3 } from "./level3";
import { Level4 } from "./level4";

// lists levels in their order
export const levels = [
    Level2,
    Level3,
    Level4,
    Level1
]

let currentLevel = -1

export function gotoNextLevel(scene: Phaser.Scenes.ScenePlugin) {
    const nextLevel = currentLevel + 1
    if (nextLevel > levels.length - 1) {
        console.debug('Game Finished — We should show end screen')
    }
    currentLevel = nextLevel

    console.info(`Starting level ${currentLevel} (${levels[currentLevel].name})`)
    scene.start(levels[currentLevel].name);
}
