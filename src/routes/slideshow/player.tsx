import { Player } from "@remotion/player";
import { Slideshow } from "@/src/types";
import { SlideshowComponent } from "./component";
import { useMeasure } from "react-use";
import { getSlideshowDuration } from "./helpers";
import { SlideshowThemedComponent } from "./themed-component";

type Props = {
  slideshow: Slideshow;
};

const FPS = 30;
const ASPECT_RATIO = 16 / 9;

export function SlideshowPlayer({ slideshow }: Props) {
  const durationInFrames = Math.floor(getSlideshowDuration(slideshow) * FPS);
  const [ref, { width, height }] = useMeasure();

  return (
    <div ref={ref} className="w-full flex flex-col relative">
      <Player
        // component={SlideshowComponent}
        component={SlideshowThemedComponent}
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
      {/* Add a spacer div to maintain the aspect ratio of the player */}
      <div style={{ top: 0, height: `${width / ASPECT_RATIO}px` }} />
    </div>
  );
}
