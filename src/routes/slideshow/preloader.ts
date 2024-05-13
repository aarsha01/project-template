import { Slideshow } from "@/src/types";
import { preloadAudio, preloadImage } from "@remotion/preload";
import { useEffect, useRef } from "react";

export function useSlideshowPreloader(slideshow: Slideshow) {
  const preloadedAssetsRef = useRef<Set<string>>(new Set());
  const unpreloaders = useRef<(() => void)[]>([]);

  useEffect(() => {
    const images = slideshow.slides.flatMap((slide) => slide.imageAsset.url);
    const audio = slideshow.slides.flatMap((slide) => slide.audioAsset.url);
    const backgroundMusic = slideshow.backgroundMusic.audioAsset.url;

    images.forEach((url) => {
      if (preloadedAssetsRef.current.has(url)) {
        return;
      }
      unpreloaders.current.push(preloadImage(url));
      preloadedAssetsRef.current.add(url);
    });
    [...audio, backgroundMusic].forEach((url) => {
      if (preloadedAssetsRef.current.has(url)) {
        return;
      }
      unpreloaders.current.push(preloadAudio(url));
      preloadedAssetsRef.current.add(url);
    });
  }, [slideshow]);

  useEffect(() => {
    return () => {
      unpreloaders.current.forEach((unpreload) => unpreload());
    };
  }, []);
}
