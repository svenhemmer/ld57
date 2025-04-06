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

export type SoundDescription = {
    path: string;
    name: string;
    format: 'mp3' | 'wav';
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
    addMapDescriptions: (descriptions: JsonTileMapDescription[]) => void;
    load: (callback: (progress: number) => void) => void;   
}

