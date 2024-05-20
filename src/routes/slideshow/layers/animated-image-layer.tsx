import { Slide } from "@/src/types";
import { useMeasure } from "react-use";
import {
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type AnimationType =
  | "to-left"
  | "to-right"
  | "to-top"
  | "to-bottom"
  | "zoom-in"
  | "zoom-out";

type Props = {
  slide: Slide;
  animation: AnimationType;
};

type AnimationTypeConfig = {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  startScale: number;
  endScale: number;
};

const ANIMATION_CONFIG: Record<AnimationType, AnimationTypeConfig> = {
  "to-left": {
    startX: 0,
    endX: -200,
    startY: 0,
    endY: 0,
    startScale: 1,
    endScale: 1,
  },
  "to-right": {
    startX: -200,
    endX: 0,
    startY: 0,
    endY: 0,
    startScale: 1,
    endScale: 1,
  },
  "to-top": {
    startX: 0,
    endX: 0,
    startY: 0,
    endY: -200,
    startScale: 1,
    endScale: 1,
  },
  "to-bottom": {
    startX: 0,
    endX: 0,
    startY: -200,
    endY: 0,
    startScale: 1,
    endScale: 1,
  },
  "zoom-in": {
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
    startScale: 1,
    endScale: 1.4,
  },
  "zoom-out": {
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
    startScale: 1.4,
    endScale: 1,
  },
} as const;

export function AnimatedImageLayer2({ slide, animation }: Props) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const [ref, { width, height }] = useMeasure();

  const { startX, endX, startY, endY, startScale, endScale } =
    ANIMATION_CONFIG[animation];

  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [startScale, endScale],
    {
      easing: Easing.linear,
    }
  );

  const deltaX = interpolate(frame, [0, durationInFrames], [startX, endX], {
    easing: Easing.linear,
  });
  const deltaY = interpolate(frame, [0, durationInFrames], [startY, endY], {
    easing: Easing.linear,
  });

  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    {
      easing: Easing.ease,
    }
  );

  const imgWidth = width + Math.abs(startX - endX);
  const imgHeight = height + Math.abs(startY - endY);

  return (
    <div
      ref={ref}
      className="w-full h-full relative rounded-[80px] box-content border-[2px] border-[#376E2A] overflow-hidden"
      style={{
        opacity,
      }}
    >
      <Img
        className="block absolute top-0 left-0 object-cover"
        style={{
          minWidth: imgWidth,
          width: imgWidth,
          height: imgHeight,
          minHeight: imgHeight,
          left: `${deltaX}px`,
          top: `${deltaY}px`,
          transform: `scale(${scale})`,
        }}
        width={imgWidth}
        height={imgHeight}
        src={slide.imageAsset.url}
        loading="eager"
        pauseWhenLoading
      />
    </div>
  );
}
