import { Slideshow } from "@/src/types";
import { AbsoluteFill, Audio, Img, Sequence, Series } from "remotion";
import { getSlideshowTimings } from "./helpers";

type Props = {
  slideshow: Slideshow;
  fps: number;
};

export function SlideshowComponent({ slideshow, fps }: Props) {
  const { slideTimingInfos } = getSlideshowTimings(slideshow);

  return (
    <AbsoluteFill className="items-center justify-center bg-black text-white text-9xl">
      {slideshow.slides.map((slide, index) => {
        const slideTimingInfo = slideTimingInfos[index];
        return (
          <Sequence
            key={`slide-${index}`}
            durationInFrames={Math.floor(slideTimingInfo.duration * fps)}
            from={Math.floor(slideTimingInfo.start * fps)}
          >
            <AbsoluteFill>
              <Img src={slide.imageAsset.url} loading="eager" />
            </AbsoluteFill>
            <Audio src={slide.audioAsset.url} />
          </Sequence>
        );
      })}
      <Audio
        key="background-music"
        src={slideshow.backgroundMusic.audioAsset.url}
        volume={0.5}
        startFrom={0}
      />
    </AbsoluteFill>
  );
}
