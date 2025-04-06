export type AnimationDescription = {
    img: string;
    width: number;
    height: number;
}

export type JsonTileMapDescription = {
    path: string;
    name: string;
}

export type ImageDescription = {
    path: string;
    name: string;
}

export type SpriteSheetDescription = {
    path: string;
    name: string;
    frameDimensions: {
        frameWidth: number,
        frameHeight: number
    }
}

export type SoundDescription = {
    path: string;
    name: string;
    format?: 'mp3' | 'wav';
    rate?: number; 
}

export type MusicDescription = {
    path: string;
    name: string;
    format: 'mp3' | 'wav';
}

export type Loader = {
    addImages: (descriptions: ImageDescription[]) => void;
    addMusic: (descriptions: MusicDescription[]) => void;
    addSoundFx: (descriptions: SoundDescription[]) => void;
    addSpriteSheet: (descriptions: SpriteSheetDescription[]) => void;
    addMapDescriptions: (descriptions: JsonTileMapDescription[]) => void;
    load: (callback: (progress: number) => void) => void;   
}

