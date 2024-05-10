import { Slideshow } from "@/src/types";
import { AbsoluteFill, Audio, Img, Sequence, Series } from "remotion";

type Props = {
  slideshow: Slideshow;
  fps: number;
};

export function SlideshowComponent({ slideshow, fps }: Props) {
  return (
    <AbsoluteFill className="items-center justify-center bg-black text-white text-9xl">
      {slideshow.slides.map((slide, index) => (
        <Sequence
          key={`slide-${index}`}
          durationInFrames={3 * fps}
          from={index * 3 * fps}
        >
          <AbsoluteFill>
            <Img src={slide.imageAsset.url} loading="eager" />
          </AbsoluteFill>
          <Audio src={slide.audioAsset.url} />
        </Sequence>
      ))}
      <Audio
        key="background-music"
        src={slideshow.backgroundMusic.audioAsset.url}
        volume={1}
        startFrom={0}
      />
    </AbsoluteFill>
  );
}
