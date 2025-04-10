import { Scene } from "phaser";
import { Loader } from "phaser";
import type { ImageDescription, MusicDescription, SoundDescription, JsonTileMapDescription, SpriteSheetDescription } from "../models/loader-info";
import { heroConvenience } from "./hero-convenience";
import { plantConvenience } from "./plant-convenience";

export const createLoader = (scene: Scene) => {

    let loadFunctions: (() => Loader.LoaderPlugin)[] = [];
    return {

        addImages: (descriptions: ImageDescription[]) => {
            loadFunctions.push(...descriptions.map(({ name, path }) => () => scene.load.image(name, path)));
        },

        addSpriteSheet: (descriptions: SpriteSheetDescription[]) => {
            loadFunctions.push(...descriptions.map(({ name, path, frameDimensions }) => () => scene.load.spritesheet(name, path, frameDimensions)));
        },

        addMusic: (descriptions: MusicDescription[]) => {
            loadFunctions.push(...descriptions.map(({ name, path }) => () => scene.load.audio(name, path)));
        },

        addSoundFx: (descriptions: SoundDescription[]) => {
            loadFunctions.push(...descriptions.map(({ name, path }) => () => scene.load.audio(name, path)));
        },

        addMapDescriptions: (descriptions: JsonTileMapDescription[]) => {
            loadFunctions.push(...descriptions.map(({ name, path }) => () => scene.load.tilemapTiledJSON(name, path)));
        },

        load: (callback: (progress: number) => void) => {
            let numLoaded = 0;
            for (let fc of loadFunctions) {
                fc();
                callback(100*++numLoaded/loadFunctions.length);
            }
        }       
    }
}

export const getLoaderConvenience = (scene: Scene) => {
    
    const loader = createLoader(scene);

    const obj = {
        initLoader: () => {        
            heroConvenience.addImagesToLoader(loader);
            heroConvenience.addSoundFx(loader);
            plantConvenience.addImagesToLoader(loader);
            loader.addSpriteSheet([
                { name: "hovering", path: 'animations/goal_hovering.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            ]);

            loader.addSpriteSheet([
                { name: "entry-gate-hovering", path: 'animations/gate.png', frameDimensions: { frameHeight: 32, frameWidth: 32} },
            ]);

            loader.addImages([{
                name: 'bg', path: 'background.png'
            }])

            return obj;
        },
        prepareTextScene: () => {
            loader.addImages([{
                name: 'bg', path: 'background.png'
            }])
            return obj
        },
        prepareLevel: (tileset: ImageDescription, jsonDescription: JsonTileMapDescription) => {
            loader.addImages([tileset]);
            loader.addMapDescriptions([jsonDescription]);
            return obj;
        },
        getLoader: () => loader
    }
    return obj;
}
