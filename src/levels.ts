import { Level2 } from "./level2";
import { Level3 } from "./level3";
import { Level4 } from "./level4";
import { Level5 } from "./level5";
import { Level6 } from "./level6";
import { Level7 } from "./level7";

// lists levels in their order
export const levels = [
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
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
