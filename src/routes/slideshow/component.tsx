import { Slideshow } from "@/src/types";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getSlideshowTimings } from "./helpers";
import "@/src/slideshow-fonts.css";

type Props = {
  slideshow: Slideshow;
  fps: number;
};

function AnimatedTextLayer({ text }: { text: string }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    {
      easing: Easing.ease,
    }
  );

  return (
    <AbsoluteFill className="flex flex-col justify-end p-8">
      <div
        className="my-32 text-8xl text-stroke"
        style={{
          fontFamily: "Poetsen One",
          opacity,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
}

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
            <AnimatedTextLayer text={slide.text} />
            <Audio src={slide.audioAsset.url} />
          </Sequence>
        );
      })}
      <Audio
        key="background-music"
        src={slideshow.backgroundMusic.audioAsset.url}
        volume={0.3}
        startFrom={0}
      />
    </AbsoluteFill>
  );
}
