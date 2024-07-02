import { Slideshow } from "@/src/types";
import { create } from "zustand";
interface EditorProps {
  prompt: string;
  slideshow: Slideshow;
  backgroundMusicArtist: string;
}

interface EditorState extends EditorProps {
  updatePrompt: (value) => void;
  updateSlideshow: (slideshow) => void;
  updateBackgroundMusicArtist: (songName, artistName) => void;
}

const useEditorStore = create<EditorState>()((set) => ({
  prompt: "",
  slideshow: undefined,
  backgroundMusicArtist: "",
  updateSlideshow: (slideshow) => set({ slideshow: slideshow }),
  updatePrompt: (value) => set({ prompt: value }),
  updateBackgroundMusicArtist: (songName, artistName) =>
    set({ backgroundMusicArtist: `${songName} by ${artistName}` }),
}));

export default useEditorStore;
