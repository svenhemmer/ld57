import { Scene } from "phaser";
import { Loader } from "phaser";
import type { ImageDescription, MusicDescription, SoundDescription, JsonTileMapDescription } from "../models/loader-info";
import { heroConvenience } from "./hero-convenience";

export const createLoader = (scene: Scene) => {

    let loadFunctions: (() => Loader.LoaderPlugin)[] = [];
    return {

        addImages: (descriptions: ImageDescription[]) => {
            loadFunctions.push(...descriptions.map(({ name, path }) => () => scene.load.image(name, path)));
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
                callback(numLoaded++);
            }
        }       
    }
}

export const getLoaderConvenience = (scene: Scene) => {
    const loader = createLoader(scene);
    heroConvenience.addImagesToLoader(loader);
}
