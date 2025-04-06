import type { Loader } from "../models/loader-info";

export const HERO_WORDS = {
    idle: 'HERO_IDLE',
    run: 'HERO_RUN',
    jump: 'HERO_JUMP',
    spawn: 'HERO_SPAWN',
    die: 'HERO_DIE'
};

export const HERO_ANIMATION_DESCRIPTIONS = {
    idle: {
        textureName: HERO_WORDS.idle,
        key: HERO_WORDS.idle,
        start: 0,
        end: 5,
        frameRate: 8,
        delay: 500
    },
    run: {
        textureName: HERO_WORDS.run,
        key: HERO_WORDS.run,
        start: 0,
        end: 4,
        frameRate: 24,
        repeat: -1,
        delay: 0
    },
    jump: {
        textureName: HERO_WORDS.jump,
        key: HERO_WORDS.jump,
        start: 0,
        end: 7,
        frameRate: 10,
        delay: 0
    },
    spawn: {
        textureName: HERO_WORDS.spawn,
        key: HERO_WORDS.spawn,
        start: 0,
        end: 6,
        frameRate: 8,
        delay: 1000
    },
    die: {
        textureName: HERO_WORDS.die,
        key: HERO_WORDS.die,
        start: 0,
        end: 8,
        frameRate: 8,
        delay: 0
    }
}

export const heroConvenience = {
    
    addImagesToLoader: ( loader: Loader ) => {
        loader.addSpriteSheet([
            { name: HERO_WORDS.idle, path: 'animations/bob_idle.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            { name: HERO_WORDS.run, path: 'animations/bob_run.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            { name: HERO_WORDS.jump, path: 'animations/bob_jump.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            { name: HERO_WORDS.spawn, path: 'animations/bob_spawn.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            { name: HERO_WORDS.die, path: 'animations/bob_die.png', frameDimensions: { frameHeight: 32, frameWidth: 32} }
        ]);
    }
}