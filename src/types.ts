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
};

export type AudioAsset = {
  id: number;
  url: string;
  duration: number;
};

export type Slide = {
  imageAsset: ImageAsset;
  audioAsset: AudioAsset;
};

export type Slideshow = {
  id: number;
  slides: Slide[];
  backgroundMusic: {
    id: number;
    audioAsset: AudioAsset;
  };
};

export type SlideshowTimingInfo = {
  slideTimingInfos: {
    start: number;
    end: number;
    duration: number;
  }[];
};

export type TaskStatus = "none" | "running" | "success" | "error";
