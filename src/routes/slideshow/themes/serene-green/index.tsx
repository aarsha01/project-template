import { SizeFormat, Slide } from "@/src/types";
import { Layout1 } from "./layouts/layout1";
import { Layout3 } from "./layouts/layout3";
import { Layout2 } from "./layouts/layout2";
import { StoryLayout1 } from "./layouts/story-layout1";

type Props = {
  index: number;
  slide: Slide;
  sizeFormat: SizeFormat;
};

const layoutComponents = [Layout1, Layout3, Layout2];

export function SlideRenderer({ index, slide, sizeFormat }: Props) {
  let LayoutComponent = layoutComponents[index % layoutComponents.length];
  if (sizeFormat === "STORY_9_16") {
    LayoutComponent = StoryLayout1;
  }
  return <LayoutComponent slide={slide} />;
}
