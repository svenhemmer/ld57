export type AnimationDescription = {
    key: string;
    textureName: string;
    frameRate: number;
    start: number;
    end: number;
    repeat?: number;
    delay?: number;
}