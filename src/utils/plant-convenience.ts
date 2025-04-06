import type { Loader } from "../models/loader-info";

export const PLANT_WORDS = {
    idle: 'PLANT_IDLE',
    bite: 'PLANT_BITE'
};

export const PLANT_ANIMATION_DESCRIPTIONS = {
    idle: {
        textureName: PLANT_WORDS.idle,
        key: PLANT_WORDS.idle,
        start: 0,
        end: 1,
        frameRate: 8,
        delay: 500
    },
    bite: {
        textureName: PLANT_WORDS.bite,
        key: PLANT_WORDS.bite,
        start: 3,
        end: 12,
        frameRate: 48,
        repeat: -1,
        delay: 0
    }
}

export const plantConvenience = {
    
    addImagesToLoader: ( loader: Loader ) => {
        loader.addSpriteSheet([
            { name: PLANT_WORDS.idle, path: 'animations/bitey.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            { name: PLANT_WORDS.bite, path: 'animations/bitey.png', frameDimensions: { frameHeight: 32, frameWidth: 32} }
        ]);
    },
    addSoundFx: ( loader: Loader ) => {
        loader.addSoundFx([
            { name: 'sound_run', path: 'fx/run.wav', format: 'wav' }
        ]);
    }
}