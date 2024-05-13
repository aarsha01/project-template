import { Slide, Slideshow, SlideshowTimingInfo } from "@/src/types";
import { sum } from "radash";

const SLIDE_SILENT_DURATION = 1;

export function getSlideDuration(slide: Slide): number {
  // each slide duration is determined by the audio duration + a silent period
  return slide.audioAsset.duration / 1000 + SLIDE_SILENT_DURATION;
}

export function getSlideshowDuration(slideshow: Slideshow): number {
  return sum(slideshow.slides, getSlideDuration);
}

export function getSlideshowTimings(slideshow: Slideshow): SlideshowTimingInfo {
  const slideDurations = slideshow.slides.map(getSlideDuration);
  const slideTimingInfos = slideDurations.map((duration, index) => {
    const start = sum(slideDurations.slice(0, index));
    const end = start + duration;
    return { start, end, duration };
  });
  return { slideTimingInfos };
}
