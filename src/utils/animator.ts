import { Scene } from "phaser";
import { AnimationDescription } from "../models/animator-info";
import { HERO_ANIMATION_DESCRIPTIONS } from "./hero-convenience";

export const animator = (scene: Scene) => {
    return {
        createAnimation: ({ key, frameRate, start, end, repeat, textureName, delay }: AnimationDescription) => {
            scene.anims.create({
                key, frameRate,
                frames: scene.anims.generateFrameNames(
                    textureName, {
                        start, end
                    }
                ),
                repeat,
                delay
            })
        }
    }
}

export const getAnimatorConvenience = (scene: Scene) => {
    const anim = animator(scene);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.idle);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.spawn);
    const obj = {
        play: (state: string) => {
            // scene.anims.play(state, true);
        }
    }
    return obj;
}