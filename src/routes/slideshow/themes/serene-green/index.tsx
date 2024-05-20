import { Slide } from "@/src/types";
import { Layout1 } from "./layouts/layout1";
import { Layout3 } from "./layouts/layout3";
import { Layout2 } from "./layouts/layout2";

type Props = {
  index: number;
  slide: Slide;
};

const layoutComponents = [Layout1, Layout3, Layout2];

export function SlideRenderer({ index, slide }: Props) {
  const LayoutComponent = layoutComponents[index % layoutComponents.length];
  return <LayoutComponent slide={slide} />;
}
