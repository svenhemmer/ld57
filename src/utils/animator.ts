import { Scene } from "phaser";
import { AnimationDescription } from "../models/animator-info";
import { HERO_ANIMATION_DESCRIPTIONS } from "./hero-convenience";
import { LEVEL_GOAL_HOVERING } from "../LevelGoal";
import { ENTRY_GATE_HOVERING } from "../EntryGate";

export const animator = (scene: Scene) => {
    return {
        createAnimation: ({ key, frameRate, start, end, repeat, textureName, delay }: AnimationDescription) => {
            scene.anims.create({
                key, frameRate, repeat, delay,
                frames: scene.anims.generateFrameNames(
                    textureName, {
                        start, end
                    }
                )
            })
        }
    }
}

export const getAnimatorConvenience = (scene: Scene) => {
    const anim = animator(scene);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.idle);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.jump);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.run);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.spawn);
    anim.createAnimation(HERO_ANIMATION_DESCRIPTIONS.die);

    anim.createAnimation(LEVEL_GOAL_HOVERING)
    anim.createAnimation(ENTRY_GATE_HOVERING)
}