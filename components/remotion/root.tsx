import React from "react";
import { Composition } from "remotion";
import { SlideshowComposition } from "./slideshow-composition";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={SlideshowComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
