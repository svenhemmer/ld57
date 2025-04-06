import type { Loader } from "../models/loader-info";

export const HERO_WORDS = {
    idle: 'HERO_IDLE',
    run: 'HERO_RUN',
    jump: 'HERO_JUMP',
    spawn: 'HERO_SPAWN',
    die: 'HERO_DIE'
};

export const TEXTURE_POSTFIX = '_TEX';

export const HERO_ANIMATION_DESCRIPTIONS = {
    idle: {
        textureName: HERO_WORDS.idle + TEXTURE_POSTFIX,
        key: HERO_WORDS.idle,
        start: 0,
        end: 5,
        frameRate: 8,
        repeat: -1
    },
    spawn: {
        textureName: HERO_WORDS.spawn + TEXTURE_POSTFIX,
        key: HERO_WORDS.spawn,
        start: 0,
        end: 7,
        frameRate: 8,
        delay: 2
    }
}

export const heroConvenience = {
    
    addImagesToLoader: ( loader: Loader ) => {
        loader.addImages([
            { name: HERO_WORDS.idle + TEXTURE_POSTFIX, path: 'animations/bob_idle.png' },
            { name: HERO_WORDS.run + TEXTURE_POSTFIX, path: 'animations/bob_run.png' },
            { name: HERO_WORDS.jump + TEXTURE_POSTFIX, path: 'animations/bob_jump.png' },
            { name: HERO_WORDS.spawn + TEXTURE_POSTFIX, path: 'animations/bob_spawn.png' },
            { name: HERO_WORDS.die + TEXTURE_POSTFIX, path: 'animations/bob_die.png' }
        ]);
    }
}