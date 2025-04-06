import type { Loader } from "../models/loader-info";

export const HERO_WORDS = {
    idle: 'HERO_IDLE',
    run: 'HERO_RUN',
    jump: 'HERO_JUMP',
    spawn: 'HERO_SPAWN',
    die: 'HERO_DIE'
};

export const heroConvenience = {
    
    addImagesToLoader: ( loader: Loader ) => {
        loader.addImages([
            { name: HERO_WORDS.idle, path: 'animations/bob_idle.png' },
            { name: HERO_WORDS.run, path: 'animations/bob_run.png' },
            { name: HERO_WORDS.jump, path: 'animations/bob_jump.png' },
            { name: HERO_WORDS.spawn, path: 'animations/bob_spawn' },
            { name: HERO_WORDS.die, path: 'animations/bob_die.png' }
        ]);
    }
}