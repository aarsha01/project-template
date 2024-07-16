import { Slide, Slideshow } from "@/src/types";

export interface Project {
  title: string;
  format: {
    name: string;
    width: number;
    height: number;
  };
  scenes: Scene[];
  voiceover: {
    artistName: string;
    durationMs: string;
  };
  backgroundMusic: {
    artistName: string;
    durationMs: string;
  };
}

export interface HeaderProps {
  projectTitle: string;
}

export type SelectedEditorTab = "scenes" | "global";

export interface EditorPanelHeaderProps {
  selectedTab: SelectedEditorTab;
  setSelectedTab: (selectedTab: SelectedEditorTab) => void;
}

export type SlideshowPreviewUrlParams = {
  projectId: string;
};

export interface Scene {
  id: string;
  text: string;
  image: {
    id: string;
    imageUrl: string;
    crop: Crop;
  };
  voiceoverText: string;
}

export interface SceneProps {
  slide: Slide;
  sceneNo: number;
  sizeFormat: string;
  onSlideUpdate: (updatedSlide: Partial<Slide>) => void;
}

export interface ScenePanelProps {
  slides: Slide[];
  sizeFormat: string;
  onSlideUpdate: (slideId, updatedSlide: Partial<Slide>) => void;
}

export type BackgroundMusicFileType = {
  id: string;
  originalFileName: string;
  storageIdentifier: string;
  category: string;
  artist: string;
  duration: number;
  tags: string[];
  timestamp: string;
  imageUrl: string;
  audioPreviewUrl: string;
};

export interface BGMusicSelectProps {
  bgMusicList: BackgroundMusicFileType[];
  updateBgMusic: (musicFile) => void;
}

export interface EditorPanelProps {
  slideshow: Slideshow;
  onSlideUpdate: (slideId: number, updatedSlide: Partial<Slide>) => void;
}

export interface GlobalPanelProps {
  slideshowId: number;
}

export interface BgMusicList {
  originalFileName: string;
  artist: string;
}
