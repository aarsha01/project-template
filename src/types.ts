export type Project = {
  id: number;
  prompt: string;
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
};

export type Slideshow = {
  id: number;
  slides: {
    imageAsset: ImageAsset;
    audioAsset: AudioAsset;
  }[];
  backgroundMusic: {
    id: number;
    audioAsset: AudioAsset;
  };
};

export type TaskStatus = "none" | "running" | "success" | "error";
