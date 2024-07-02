import { Slideshow } from "@/src/types";
import { create } from "zustand";
interface EditorProps {
  prompt: string;
  slideshow: Slideshow;
}

interface EditorState extends EditorProps {
  updatePrompt: (value) => void;
  updateSlideshow: (slideshow) => void;
}

const useEditorStore = create<EditorState>()((set) => ({
  prompt: "",
  slideshow: undefined,
  updateSlideshow: (slideshow) => set({ slideshow: slideshow }),
  updatePrompt: (value) => set({ prompt: value }),
}));

export default useEditorStore;
