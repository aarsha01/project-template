import { cn } from "@/lib/utils";
import { ArrowDown, CheckIcon, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GENERATION_PROGRESS_STAGES = [
  {
    key: "fetching-images",
    text: "Fetching images",
  },
  {
    key: "searching-music",
    text: "Searching for the right music",
  },
  {
    key: "generating-voiceovers",
    text: "Generating voiceovers",
  },
  {
    key: "final-touches",
    text: "Finishing everything up",
  },
] as const;

const TOTAL_APPOXIMATE_GENERATION_TIME = 20 * 1000;
const TIME_AFTER_COMPLETION = 5 * 1000;

type Props = {
  projectId: string;
  isSlideShowGenerationComplete: boolean;
};

export function GeneratingSlideshow({
  projectId,
  isSlideShowGenerationComplete,
}: Props) {
  const navigate = useNavigate();
  const [generationProgressStageIndex, setGenerationProgressStageIndex] =
    useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGenerationProgressStageIndex((prev) =>
        prev < GENERATION_PROGRESS_STAGES.length - 1 ? prev + 1 : prev
      );
    }, TOTAL_APPOXIMATE_GENERATION_TIME / GENERATION_PROGRESS_STAGES.length);
    intervalRef.current = interval;
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSlideShowGenerationComplete) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setGenerationProgressStageIndex(GENERATION_PROGRESS_STAGES.length - 1);
      setTimeout(() => {
        navigate(`/projects/${projectId}/slideshow-preview`);
      }, TIME_AFTER_COMPLETION);
    }
  }, [isSlideShowGenerationComplete]);

  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <div className="flex flex-1 flex-col gap-8 p-8">
        <div className="flex items-center">
          <h1 className="flex-1 flex gap-2 items-center text-lg font-semibold md:text-2xl">
            <Loader2Icon className="animate-spin" />
            Generating slideshow
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-start gap-16 text-center">
          <div className="text-lg font-semibold">
            Wizards over at TakeOne are busy creating your video right now...
          </div>
          <div className="flex flex-1 w-full items-start justify-center">
            <div className="flex flex-col items-center gap-2">
              {GENERATION_PROGRESS_STAGES.map((stage, index) => (
                <div
                  key={stage.key}
                  className={cn("flex flex-col items-center gap-2", {
                    "opacity-40": generationProgressStageIndex < index,
                  })}
                >
                  {index > 0 && <ArrowDown className="w-6" />}
                  <div className="flex gap-2 items-center">
                    {generationProgressStageIndex === index && (
                      <Loader2Icon className="animate-spin" />
                    )}
                    {generationProgressStageIndex > index && <CheckIcon />}
                    <div className="text-lg font-semibold">{stage.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
