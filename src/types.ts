export type ProjectStatus =
  | "NONE"
  | "SCRIPT_READY"
  | "SLIDESHOW_DESCRIPTOR_READY"
  | "SLIDESHOW_READY";

export type Project = {
  id: number;
  prompt: string;
  status: ProjectStatus;
  currentScript: Script;
};

export type Script = {
  slideTextDescriptors: {
    content: string;
  }[];
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
};

export type Slide = {
  headingText: string;
  text: string;
  imageAsset: ImageAsset;
  audioAsset: AudioAsset;
};

export const SIZE_FORMATS = [
  "WIDESCREEN_16_9",
  "SQUARE_1_1",
  "STORY_9_16",
  "VERTICAL_4_5",
] as const;
export type SizeFormat = (typeof SIZE_FORMATS)[number];

export type Slideshow = {
  id: number;
  slides: Slide[];
  backgroundMusic: {
    id: number;
    audioAsset: AudioAsset;
  };
  settings: {
    sizeFormat: SizeFormat;
  };
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
