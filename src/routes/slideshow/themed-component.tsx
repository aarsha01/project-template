import "@/src/slideshow-fonts.css";
import { Slideshow } from "@/src/types";
import { preloadVideo } from "@remotion/preload";
import { list } from "radash";
import { useEffect } from "react";
import { AbsoluteFill, Audio, Sequence, Video } from "remotion";
import { getSlideshowTimings } from "./helpers";
import { Layout1 } from "./layers/layout1";
import { Layout2 } from "./layers/layout2";
import { Layout3 } from "./layers/layout3";
import { useSlideshowPreloader } from "./preloader";

type Props = {
  slideshow: Slideshow;
  fps: number;
};

const LOOPING_BACKGROUND_VIDEO_URL =
  "https://storage.googleapis.com/takeone-v1-test-all-media/static/backgrounds/looping-bg-video-grayscale.mp4?GoogleAccessId=takeone-cloudrun%40takeone-410718.iam.gserviceaccount.com&Expires=16446997800&Signature=pG2hkucpsm9QkW0z4NNC1vQma%2FPrxmbVld9hpVr4ffgxchsSttAMkjFKoavPgqsq1dcwsEs47H%2BrVTn4meUlr6P%2BbVYdLWYTvb9Z%2BjXlFbJ35QnosEtLQm%2BJrCiwtKJ%2BZ36ZboODRD2Fq1gyXTS7cSknK0H6FEnYf5vLAPpjlaJHxS0DCO2xWqKEpAuxXF3fSgrDqZfxtZlGVCjigPD1PcORXwa%2F6CNbPd%2BjjeePUk7%2BniusRP3uondnm3IHiFRFB9yjXnEdRkayhE4gpS4OzlKbtwuyU3DWy1b8yQmAGzvDLyR7xCe9PQn9q7f9GcUCg82NuqmaSRytW9fmYZzIug%3D%3D";
const LOOPING_VIDEO_DURATION = 10;

const layoutComponents = [Layout1, Layout3, Layout2];

export function SlideshowThemedComponent({ slideshow, fps }: Props) {
  const { slideTimingInfos, totalDuration } = getSlideshowTimings(slideshow);

  useSlideshowPreloader(slideshow);

  useEffect(() => {
    const unpreloader = preloadVideo(LOOPING_BACKGROUND_VIDEO_URL);
    return () => {
      unpreloader();
    };
  }, []);

  const numLoops = Math.ceil(totalDuration / LOOPING_VIDEO_DURATION);

  return (
    <AbsoluteFill className="items-center justify-center bg-white">
      <AbsoluteFill className="bg-[#376E2A] opacity-10" />
      <div className="opacity-10">
        {list(numLoops).map((index) => (
          <Sequence
            key={`looping-bg-video-${index}`}
            premountFor={100}
            durationInFrames={Math.floor(LOOPING_VIDEO_DURATION * fps)}
            from={Math.floor(index * LOOPING_VIDEO_DURATION * fps)}
          >
            <Video src={LOOPING_BACKGROUND_VIDEO_URL} pauseWhenBuffering />
          </Sequence>
        ))}
      </div>
      {slideshow.slides.map((slide, index) => {
        const slideTimingInfo = slideTimingInfos[index];
        const LayoutComponent =
          layoutComponents[index % layoutComponents.length];
        return (
          <Sequence
            key={`slide-${index}`}
            premountFor={100}
            durationInFrames={Math.floor(slideTimingInfo.duration * fps)}
            from={Math.floor(slideTimingInfo.start * fps)}
          >
            {/* <Layout1 slide={slide} /> */}
            {/* <Layout2 slide={slide} /> */}
            {/* <Layout3 slide={slide} /> */}
            <LayoutComponent slide={slide} />
            <Audio src={slide.audioAsset.url} pauseWhenBuffering />
          </Sequence>
        );
      })}
      <Audio
        pauseWhenBuffering
        key="background-music"
        src={slideshow.backgroundMusic.audioAsset.url}
        volume={0.3}
        startFrom={0}
      />
    </AbsoluteFill>
  );
}
