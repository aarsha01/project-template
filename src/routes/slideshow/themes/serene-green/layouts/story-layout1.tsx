import { Slide } from "@/src/types";
import { AnimatedTextLayer } from "../../../layers/animated-text-layer";
import { normalTextStyles, titleTextStyles } from "../../../layers/text-styles";
import { AnimatedImageLayer } from "../../../layers/animated-image-layer";

export function StoryLayout1({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-full max-h-full flex flex-col flex-1 items-center p-[60px] gap-[60px]">
      <AnimatedTextLayer
        className="text-center text-[#376E2A]"
        animation="to-top"
        text={slide.headingText}
        textStyles={titleTextStyles}
      />
      <div className="h-[960px] w-full">
        <AnimatedImageLayer animation="zoom-in" slide={slide} />
      </div>
      <div className="max-w-full flex-1 flex items-center px-[40px]">
        <AnimatedTextLayer
          className="text-left flex flex-col items-start"
          animation="to-top"
          text={slide.text}
          textStyles={normalTextStyles}
        />
      </div>
    </div>
  );
}
