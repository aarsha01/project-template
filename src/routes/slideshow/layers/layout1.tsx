import { Slide } from "@/src/types";
import { AnimatedTextLayer2 } from "./animated-text-layer";
import { normalTextStyles, titleTextStyles } from "./text-styles";
import { AnimatedImageLayer2 } from "./animated-image-layer";

export function Layout1({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-full max-h-full flex flex-col flex-1 items-center p-[60px] gap-[30px]">
      <AnimatedTextLayer2
        className="text-center text-[#376E2A]"
        animation="to-right"
        text={slide.headingText}
        textStyles={titleTextStyles}
      />
      <div className="max-w-full flex-1 flex flex-row gap-[120px]">
        <div className="flex-1 flex items-center">
          <AnimatedTextLayer2
            className="text-left flex flex-col items-start"
            animation="to-right"
            text={slide.text}
            textStyles={normalTextStyles}
          />
        </div>
        <div className="w-[760px] h-full">
          <AnimatedImageLayer2 animation="to-right" slide={slide} />
        </div>
      </div>
    </div>
  );
}
