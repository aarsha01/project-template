import { SizeFormat, Slide, Slideshow, SlideshowTimingInfo } from "@/src/types";
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
  const totalDuration = getSlideshowDuration(slideshow);
  return { slideTimingInfos, totalDuration };
}

export function getCompostionSize(sizeFormat: SizeFormat) {
  switch (sizeFormat) {
    case "WIDESCREEN_16_9":
      return [1920, 1080];
    case "SQUARE_1_1":
      return [1080, 1080];
    case "STORY_9_16":
      return [1080, 1920];
    case "VERTICAL_4_5":
      return [1080, 1350];
    default:
      const exhaustiveCheck: never = sizeFormat;
  }
}

export function getAspectRatio(sizeFormat: SizeFormat) {
  const [width, height] = getCompostionSize(sizeFormat);
  return width / height;
}
