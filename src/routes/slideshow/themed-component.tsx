import { Slide, Slideshow } from "@/src/types";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getSlideshowTimings } from "./helpers";
import "@/src/slideshow-fonts.css";
import { useSlideshowPreloader } from "./preloader";
import { useEffect, useMemo } from "react";
import { preloadVideo } from "@remotion/preload";
import clsx from "clsx";
import { list, range, sum } from "radash";
import { fillTextBox, measureText } from "@remotion/layout-utils";

type Props = {
  slideshow: Slideshow;
  fps: number;
};

function getLines(
  text: string,
  maxWidth: number,
  {
    fontSize,
    fontFamily,
    fontWeight,
  }: {
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
  },
  additionalStyles: Record<string, string>
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  // console.log(words);
  const box = fillTextBox({
    maxLines: 100,
    maxBoxWidth: maxWidth,
  });
  let firstLine = true;
  for (const word of words) {
    const { newLine, exceedsBox } = box.add({
      text: word,
      validateFontIsLoaded: false,
      fontSize,
      fontFamily,
      fontWeight,
      additionalStyles,
    });
    if (newLine) {
      firstLine = false;
      console.log("currentLine", currentLine, "---newLine word", word);
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += firstLine && !currentLine ? word : ` ${word}`;
    }
    if (exceedsBox) {
      break;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

const textStyles = {
  fontSize: 40,
  fontFamily: "Poppins",
  fontWeight: 700,
  lineHeight: "1.5",
};

type AnimatedTextLayerProps = {
  text: string;
  width: number;
  animationDirection: "to-left" | "to-right" | "to-top" | "to-bottom";
  className?: string;
};

function AnimatedTextLayer({
  text,
  width,
  animationDirection,
  className,
}: AnimatedTextLayerProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = useMemo(() => {
    return getLines(text, width, textStyles, {
      lineHeight: textStyles.lineHeight,
    });
  }, [text, width]);

  useEffect(() => {
    console.log(lines);
  }, [lines]);

  const animationDurationInFrames = 0.5 * fps;

  const springs = new Array(lines.length).fill(0).map((_, index) => {
    return spring({
      frame: frame - index * 5,
      durationInFrames: animationDurationInFrames,
      fps,
      config: {
        mass: 1,
        stiffness: 43,
        damping: 12,
      },
    });
  });

  const transformer = (index: number) => {
    const spring = springs[index];
    if (animationDirection === "to-left") {
      return `translateX(${interpolate(spring, [0, 1], [50, 0])}px)`;
    } else if (animationDirection === "to-right") {
      return `translateX(${interpolate(spring, [0, 1], [-50, 0])}px)`;
    } else if (animationDirection === "to-top") {
      return `translateY(${interpolate(spring, [0, 1], [50, 0])}px)`;
    } else if (animationDirection === "to-bottom") {
      return `translateY(${interpolate(spring, [0, 1], [-50, 0])}px)`;
    }
    const _exhaustiveCheck: never = animationDirection;
  };

  return (
    <div
      className={clsx("antialiased text-[#376E2A]", className)}
      style={{
        fontSize: textStyles.fontSize,
        fontFamily: textStyles.fontFamily,
        fontWeight: textStyles.fontWeight,
        lineHeight: textStyles.lineHeight,
        width: `${width}px`,
        opacity: 1,
      }}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          className="whitespace-pre inline-block"
          style={{
            transform: transformer(index),
            opacity: interpolate(springs[index], [0, 1], [0, 1]),
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

type AnimatedImageLayerProps = {
  slide: Slide;
  width: number;
  height: number;
  animation:
    | "to-left"
    | "to-right"
    | "to-top"
    | "to-bottom"
    | "zoom-in"
    | "zoom-out";
};

function AnimatedImageLayer({
  slide,
  width,
  height,
  animation,
}: AnimatedImageLayerProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const distance = 200;
  const isAnimationVertical =
    animation === "to-top" || animation === "to-bottom";
  const isAnimationHorizontal =
    animation === "to-left" || animation === "to-right";
  const isAnimationZoom = animation === "zoom-in" || animation === "zoom-out";

  const scale = isAnimationZoom
    ? interpolate(
        frame,
        [0, durationInFrames],
        animation === "zoom-in" ? [1, 1.4] : [1.4, 1],
        {
          easing: Easing.linear,
        }
      )
    : 1;

  const deltaX = isAnimationHorizontal
    ? interpolate(
        frame,
        [0, durationInFrames],
        animation === "to-left" ? [0, -distance] : [-distance, 0],
        {
          easing: Easing.linear,
        }
      )
    : 0;
  const deltaY = isAnimationVertical
    ? interpolate(
        frame,
        [0, durationInFrames],
        animation === "to-top" ? [0, -distance] : [-distance, 0],
        {
          easing: Easing.linear,
        }
      )
    : 0;

  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    {
      easing: Easing.ease,
    }
  );

  const imgWidth = width + (isAnimationVertical ? 0 : distance);
  const imgHeight = height + (isAnimationVertical ? distance : 0);

  return (
    <div
      className="relative rounded-[80px] box-content border-[2px] border-[#376E2A] overflow-hidden"
      style={{
        opacity,
        width: `${width}px`,
        height: `${height}px`,
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

function Layout1({ slide }: { slide: Slide }) {
  const { width, height } = useVideoConfig();
  const padding = 60;
  const gap = 120;
  const imageWidth = 760;
  const imageHeight = height - 2 * padding;
  const textWidth = width - imageWidth - gap - 2 * padding;
  return (
    <div className="flex flex-row items-center" style={{ padding, gap }}>
      <AnimatedTextLayer
        className="text-left"
        animationDirection="to-right"
        text={slide.text}
        width={textWidth}
      />
      <AnimatedImageLayer
        animation="to-right"
        slide={slide}
        width={imageWidth}
        height={imageHeight}
      />
    </div>
  );
}

function Layout2({ slide }: { slide: Slide }) {
  const { width, height } = useVideoConfig();
  const padding = 60;
  const gap = 60;
  const textExtraPadding = 40; // compensate for some measurement issues
  const textWidth = width - 2 * padding - 2 * gap - textExtraPadding;
  const { height: textHeight } = measureText({
    text: slide.text,
    validateFontIsLoaded: true,
    fontFamily: textStyles.fontFamily,
    fontSize: textStyles.fontSize,
    fontWeight: textStyles.fontWeight,
    additionalStyles: {
      lineHeight: textStyles.lineHeight,
    },
  });
  const imageWidth = width - 2 * padding;
  const imageHeight = height - textHeight - gap - 2 * padding;
  return (
    <div className="flex flex-col items-center" style={{ padding, gap }}>
      <AnimatedImageLayer
        animation="to-top"
        slide={slide}
        width={imageWidth}
        height={imageHeight}
      />
      <AnimatedTextLayer
        className="text-center"
        animationDirection="to-top"
        text={slide.text}
        width={textWidth}
      />
    </div>
  );
}

function Layout3({ slide }: { slide: Slide }) {
  const { width, height } = useVideoConfig();
  const padding = 60;
  const gap = 120;
  const imageWidth = 760;
  const imageHeight = height - 2 * padding;
  const textWidth = width - imageWidth - gap - 2 * padding;
  return (
    <div className="flex flex-row items-center" style={{ padding, gap }}>
      <AnimatedImageLayer
        animation="to-right"
        slide={slide}
        width={imageWidth}
        height={imageHeight}
      />
      <AnimatedTextLayer
        className="text-right flex flex-col items-end"
        animationDirection="to-right"
        text={slide.text}
        width={textWidth}
      />
    </div>
  );
}
