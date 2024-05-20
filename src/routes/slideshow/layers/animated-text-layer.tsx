import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TextStyles } from "./text-styles";
import { useMeasure } from "react-use";
import { useEffect, useMemo } from "react";
import clsx from "clsx";
import { getLines } from "./get-lines";

type AnimationType = "to-left" | "to-right" | "to-top" | "to-bottom";

type AnimationTypeConfig = {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
};

const ANIMATION_CONFIG: Record<AnimationType, AnimationTypeConfig> = {
  "to-left": {
    startX: 50,
    endX: 0,
    startY: 0,
    endY: 0,
  },
  "to-right": {
    startX: -50,
    endX: 0,
    startY: 0,
    endY: 0,
  },
  "to-top": {
    startX: 0,
    endX: 0,
    startY: 50,
    endY: 0,
  },
  "to-bottom": {
    startX: 0,
    endX: 0,
    startY: -50,
    endY: 0,
  },
} as const;

type Props = {
  text: string;
  animation: "to-left" | "to-right" | "to-top" | "to-bottom";
  className?: string;
  textStyles: TextStyles;
};

export function AnimatedTextLayer({
  text,
  animation,
  className,
  textStyles,
}: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [ref, { width }] = useMeasure();

  const measured = width > 0;

  const lines = useMemo(() => {
    if (!width) {
      return [];
    }
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

  const { startX, endX, startY, endY } = ANIMATION_CONFIG[animation];

  const transformer = (index: number) => {
    const spring = springs[index];
    return `translate(${interpolate(
      spring,
      [0, 1],
      [startX, endX]
    )}px, ${interpolate(spring, [0, 1], [startY, endY])}px)`;
  };

  return (
    <div
      ref={ref}
      className={clsx("antialiased text-[#376E2A]", className)}
      style={{
        fontSize: textStyles.fontSize,
        fontFamily: textStyles.fontFamily,
        fontWeight: textStyles.fontWeight,
        lineHeight: textStyles.lineHeight,
        opacity: measured ? 1 : 0,
      }}
    >
      {!measured && text}
      {measured &&
        lines.map((line, index) => (
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
