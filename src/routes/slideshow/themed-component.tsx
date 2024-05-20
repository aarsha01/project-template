import "@/src/slideshow-fonts.css";
import { Slideshow } from "@/src/types";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { getSlideshowTimings } from "./helpers";
import { LoopedVideoLayer } from "./layers/looped-video-layer";
import { useSlideshowPreloader } from "./preloader";
import { SlideRenderer } from "./themes/serene-green";

type Props = {
  slideshow: Slideshow;
  fps: number;
};

export function SlideshowThemedComponent({ slideshow, fps }: Props) {
  const { slideTimingInfos } = getSlideshowTimings(slideshow);

  useSlideshowPreloader(slideshow);

  return (
    <AbsoluteFill className="items-center justify-center bg-white">
      <AbsoluteFill className="bg-[#376E2A] opacity-10" />
      <div className="opacity-10">
        <LoopedVideoLayer slideshow={slideshow} />
      </div>
      {slideshow.slides.map((slide, index) => {
        const slideTimingInfo = slideTimingInfos[index];
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
            <SlideRenderer index={index} slide={slide} />
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
