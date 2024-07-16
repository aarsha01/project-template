export type ProjectStatus =
  | "NONE"
  | "SCRIPT_READY"
  | "SLIDESHOW_DESCRIPTOR_READY"
  | "SLIDESHOW_READY";

export type Project = {
  id: number;
  prompt: string;
  status: ProjectStatus;
  slideTextDescriptors: string[];
};

export type ImageAsset = {
  id: number;
  url: string;
  width: number;
  height: number;
  originalFilename: string;
};

export type AudioAsset = {
  id: number;
  url: string;
  duration: number;
  artist: string | null;
  songName: string | null;
};

export type Slide = {
  id: number;
  headingText: string;
  text: string;
  imageAsset: ImageAsset;
  audioAsset: AudioAsset;
  voiceoverText: string;
};

export const SIZE_FORMATS = [
  "WIDESCREEN_16_9",
  "SQUARE_1_1",
  "STORY_9_16",
  "VERTICAL_4_5",
] as const;

export type SizeFormat = (typeof SIZE_FORMATS)[number];

export type VoiceType = "MALE" | "FEMALE";

export type Slideshow = {
  id: number;
  slides: Slide[];
  backgroundMusicAudio: AudioAsset;
  sizeFormat: SizeFormat;
  voiceType: VoiceType;
};

export type SlideshowTimingInfo = {
  slideTimingInfos: {
    start: number;
    end: number;
    duration: number;
  }[];
  totalDuration: number;
};

export type TaskStatus = "none" | "running" | "success" | "error";
