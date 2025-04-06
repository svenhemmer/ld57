export class AudioManagerScene extends Phaser.Scene {
  private music!: Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound;
  private currentVolume = VolumeLevel.FULL;
  private readonly volumeLevels = VolumeLevel.normalizedValues();
  private volumeIcon!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: AudioManagerScene.name, active: true });
  }

  preload() {
    this.load.audio('bgMusic', '/audio/beepy.mp3');
    this.load.image('volume0', '/volume/volume0.png');
    this.load.image('volume1', '/volume/volume1.png');
    this.load.image('volume2', '/volume/volume2.png');
    this.load.image('volume3', '/volume/volume3.png');
  }

  getCurrentVolume() {
    return this.music.mute ? 0 : this.volumeLevels[this.currentVolume]
  }

  create(): void {
    const music = this.sound.add('bgMusic', { loop: true });
    if ('setVolume' in music && typeof music.setVolume === 'function') {
      this.music = music as
        | Phaser.Sound.WebAudioSound
        | Phaser.Sound.HTML5AudioSound;
      this.music.setVolume(this.volumeLevels[this.currentVolume]);
      this.music.play();
    }
    this.music.play();

    this.input.keyboard?.on('keydown-M', () => {
      this.toggleMute();
    });
    this.createVolumeIcon();
  }

  private createVolumeIcon() {
    this.volumeIcon = this.add
      .image(this.scale.width - 32, 32, `volume${this.currentVolume}`)
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setInteractive();

    this.volumeIcon.on('pointerdown', this.changeVolume, this);
  }

  private changeVolume() {
    console.log('before', this.music.volume);
    this.currentVolume = (this.currentVolume + 1) % this.volumeLevels.length;
    const newVolume = this.volumeLevels[this.currentVolume];
    if (newVolume === VolumeLevel.OFF) {
      this.music.setMute(true);
    } else {
      this.music.setMute(false);
    }
    this.music.setVolume(newVolume);
    this.volumeIcon.setTexture(`volume${this.currentVolume}`);
    console.log('after', this.music.volume);
  }

  private toggleMute() {
    if (this.music.mute) {
      this.music.setMute(false);
      this.volumeIcon.setTexture(`volume${this.currentVolume}`);
    } else {
      this.music.setMute(true);
      this.volumeIcon.setTexture(`volume${VolumeLevel.OFF}`);
    }
  }
}

export enum VolumeLevel {
  OFF,
  LOW,
  HIGH,
  FULL,
}

export namespace VolumeLevel {
  const values = Object.values(VolumeLevel).filter(
    (v) => typeof v === 'number'
  );
  const min = Math.min(...values);
  const max = Math.max(...values);

  export function normalize(value: VolumeLevel): number {
    return (value - min) / (max - min);
  }

  // enum values clamped between 0 and 1 (percentages)
  export function normalizedValues(): number[] {
    return values.map((v) => normalize(v));
  }
}
