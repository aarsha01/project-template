import { Slide } from "@/src/types";
import { AnimatedTextLayer2 } from "./animated-text-layer";
import { normalTextStyles, titleTextStyles } from "./text-styles";
import { AnimatedImageLayer2 } from "./animated-image-layer";

export function Layout2({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-full max-h-full flex-1 flex flex-col items-center p-[60px] gap-[60px]">
      <AnimatedTextLayer2
        className="text-center text-[#376E2A]"
        animation="to-top"
        text={slide.headingText}
        textStyles={titleTextStyles}
      />
      <AnimatedImageLayer2 animation="to-top" slide={slide} />
      <div className="max-w-full flex-1 flex px-[40px]">
        <AnimatedTextLayer2
          className="text-center"
          animation="to-top"
          text={slide.text}
          textStyles={normalTextStyles}
        />
      </div>
    </div>
  );
}
