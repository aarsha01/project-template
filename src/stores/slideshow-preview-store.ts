import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { SizeFormat, Slideshow } from "../types";
import { saveSlideshowSettings } from "../api/takeone";

type SlideshowPreviewVariables = {
  slideshow: Slideshow | null;
  sizeFormat: SizeFormat;
};

type SlideshowPreviewState = SlideshowPreviewVariables &
  ReturnType<typeof getActions>;

function getInitialVariables(): SlideshowPreviewVariables {
  return {
    slideshow: null,
    sizeFormat: "WIDESCREEN_16_9",
  };
}

function getActions(set, get) {
  return {
    changeSizeFormat: (sizeFormat: SizeFormat) => set({ sizeFormat }),
    setSlideshow: (slideshow: Slideshow) => {
      set({ slideshow });
      set({ sizeFormat: slideshow.settings.sizeFormat });
    },
    initializeSlideshowPreviewStore: () => set(getInitialVariables()),
    saveSlideshowChanges: async () => {
      // save changes
      const slideshow = get().slideshow;
      const sizeFormat = get().sizeFormat;
      const newSlideshow = await saveSlideshowSettings(slideshow.id, {
        sizeFormat,
      });
      set({ slideshow: newSlideshow });
    },
  };
}

export const useSlideshowPreviewStore = create<SlideshowPreviewState>()(
  devtools((set, get) => ({
    ...getInitialVariables(),
    ...getActions(set, get),
  }))
);

export function useSlideshowPreviewStoreHasChanges() {
  const slideshow = useSlideshowPreviewStore((state) => state.slideshow);
  const sizeFormat = useSlideshowPreviewStore((state) => state.sizeFormat);
  return sizeFormat !== slideshow?.settings.sizeFormat;
}
