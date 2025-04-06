import { Level10 } from "./level10";
import { Level2 } from "./level2";
import { Level3 } from "./level3";
import { Level5 } from "./level5";
import { Level7 } from "./level7";
import { Level8 } from "./level8";
import { Level9 } from "./level9";

// lists levels in their order
export const levels = [
    Level2,
    Level3,
    // Level4, // not a useful level anymore
    Level5,
    // Level6, // not a good level
    Level8,
    Level9,
    Level7,
    Level10,
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

export function getNextLevelInfoText() {
    const nextLevel = currentLevel + 1
    if (nextLevel > levels.length - 1) {
        return "GAME ENDING"
    }
    return `LEVEL ${nextLevel + 1}`
}

export function wasLastLevel() {
    return currentLevel >= levels.length - 1
}