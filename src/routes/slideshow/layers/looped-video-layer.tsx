import { Slideshow } from "@/src/types";
import { list } from "radash";
import { AbsoluteFill, Sequence, Video, useVideoConfig } from "remotion";
import { getSlideshowTimings } from "../helpers";
import { useEffect } from "react";
import { preloadVideo } from "@remotion/preload";

const LOOPING_BACKGROUND_VIDEO_URL =
  "https://storage.googleapis.com/takeone-v1-test-all-media/static/backgrounds/looping-bg-video-grayscale.mp4?GoogleAccessId=takeone-cloudrun%40takeone-410718.iam.gserviceaccount.com&Expires=16446997800&Signature=pG2hkucpsm9QkW0z4NNC1vQma%2FPrxmbVld9hpVr4ffgxchsSttAMkjFKoavPgqsq1dcwsEs47H%2BrVTn4meUlr6P%2BbVYdLWYTvb9Z%2BjXlFbJ35QnosEtLQm%2BJrCiwtKJ%2BZ36ZboODRD2Fq1gyXTS7cSknK0H6FEnYf5vLAPpjlaJHxS0DCO2xWqKEpAuxXF3fSgrDqZfxtZlGVCjigPD1PcORXwa%2F6CNbPd%2BjjeePUk7%2BniusRP3uondnm3IHiFRFB9yjXnEdRkayhE4gpS4OzlKbtwuyU3DWy1b8yQmAGzvDLyR7xCe9PQn9q7f9GcUCg82NuqmaSRytW9fmYZzIug%3D%3D";
const LOOPING_VIDEO_DURATION = 10;

type Props = {
  slideshow: Slideshow;
};

export function LoopedVideoLayer({ slideshow }: Props) {
  const { fps } = useVideoConfig();
  const { totalDuration } = getSlideshowTimings(slideshow);

  useEffect(() => {
    const unpreloader = preloadVideo(LOOPING_BACKGROUND_VIDEO_URL);
    return () => {
      unpreloader();
    };
  }, []);

  const numLoops = Math.ceil(totalDuration / LOOPING_VIDEO_DURATION);
  return (
    <>
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
    </>
  );
}
