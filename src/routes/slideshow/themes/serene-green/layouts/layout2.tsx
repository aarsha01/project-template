import { Slide } from "@/src/types";
import { normalTextStyles, titleTextStyles } from "../../../layers/text-styles";
import { AnimatedImageLayer } from "../../../layers/animated-image-layer";
import { AnimatedTextLayer } from "../../../layers/animated-text-layer";

export function Layout2({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-full max-h-full flex-1 flex flex-col items-center p-[60px] gap-[60px]">
      <AnimatedTextLayer
        className="text-center text-[#376E2A]"
        animation="to-top"
        text={slide.headingText}
        textStyles={titleTextStyles}
      />
      <AnimatedImageLayer animation="to-top" slide={slide} />
      <div className="max-w-full flex-1 flex px-[40px]">
        <AnimatedTextLayer
          className="text-center"
          animation="to-top"
          text={slide.text}
          textStyles={normalTextStyles}
        />
      </div>
    </div>
  );
}
