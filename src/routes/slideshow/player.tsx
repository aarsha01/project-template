import { Player } from "@remotion/player";
import { SizeFormat, Slideshow } from "@/src/types";
import { useMeasure } from "react-use";
import {
  getAspectRatio,
  getCompostionSize,
  getSlideshowDuration,
} from "./helpers";
import { SlideshowThemedComponent } from "./themed-component";

type Props = {
  slideshow: Slideshow;
  sizeFormat: SizeFormat;
};

const FPS = 30;

const MAX_HEIGHT = 720;

export function SlideshowPlayer({ slideshow, sizeFormat }: Props) {
  const durationInFrames = Math.floor(getSlideshowDuration(slideshow) * FPS);
  const [ref, { width: containerWidth }] = useMeasure();

  const aspectRatio = getAspectRatio(sizeFormat);

  const [compositionWidth, compositionHeight] = getCompostionSize(sizeFormat);

  const calculatedHeight = containerWidth / aspectRatio;
  const actualHeight = Math.min(calculatedHeight, MAX_HEIGHT);
  const actualWidth = actualHeight * aspectRatio;

  return (
    <div ref={ref} className="w-full flex flex-col items-center relative">
      <Player
        component={SlideshowThemedComponent}
        inputProps={{ slideshow, fps: FPS, sizeFormat }}
        durationInFrames={durationInFrames}
        compositionWidth={compositionWidth}
        compositionHeight={compositionHeight}
        fps={FPS}
        style={{
          position: "absolute",
          width: `${actualWidth}px`,
          height: `${actualHeight}px`,
        }}
        controls
      />
      {/* Add a spacer div to maintain the aspect ratio of the player */}
      <div style={{ top: 0, height: `${actualHeight}px` }} />
    </div>
  );
}
