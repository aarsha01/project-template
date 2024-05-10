import { Player } from "@remotion/player";
import { Slideshow } from "@/src/types";
import { SlideshowComponent } from "./component";
import { useMeasure } from "react-use";

type Props = {
  slideshow: Slideshow;
};

const FPS = 30;
const ASPECT_RATIO = 16 / 9;

export function SlideshowPlayer({ slideshow }: Props) {
  const durationInFrames = slideshow.slides.length * 3 * FPS;
  const [ref, { width, height }] = useMeasure();

  return (
    <div ref={ref} className="w-full flex flex-col relative">
      <Player
        component={SlideshowComponent}
        inputProps={{ slideshow, fps: FPS }}
        durationInFrames={durationInFrames}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={FPS}
        style={{
          position: "absolute",
          width: `${width}px`,
          height: `${width / ASPECT_RATIO}px`,
        }}
        controls
      />
      <div style={{ top: 0, height: `${width / ASPECT_RATIO}px` }} />
    </div>
  );
}
