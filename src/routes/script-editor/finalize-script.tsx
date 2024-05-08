import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getProject } from "@/src/api/takeone";
import { Loader2Icon, MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function FinalizeScript({
  projectId,
  onCreateVideoPreview,
}: {
  projectId: string;
  onCreateVideoPreview: (slideTexts: string[]) => Promise<void>;
}) {
  const [slideTexts, setSlideTexts] = useState<string[]>([]);

  useEffect(() => {
    async function fetchScript() {
      try {
        const { project, success } = await getProject(projectId);
        if (!success) {
          throw new Error("Failed to fetch project");
        }
        setSlideTexts(
          project.script.slideTextDescriptors.map((st) => st.content)
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchScript();
  }, [projectId]);

  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <div className="flex flex-1 flex-col gap-8 p-8">
        <div className="flex items-center">
          <h1 className="flex-1 text-lg font-semibold md:text-2xl">
            Finalize your script
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-start gap-16 text-center">
          {slideTexts.length > 0 ? (
            <div className="flex flex-col items-start gap-8 text-center">
              <div className="text-lg font-semibold text-left">
                We created a script based on your prompt.
                <br />
                You can review and edit if needed.
              </div>
              <div className="flex flex-col min-w-[600px] gap-3">
                {slideTexts.map((line, index) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                      <div className="w-6 text-gray-500">{index + 1}.</div>
                      <Textarea
                        key={index}
                        value={line}
                        onChange={(e) => {
                          const newSlideTexts = [...slideTexts];
                          newSlideTexts[index] = e.target.value;
                          setSlideTexts(newSlideTexts);
                        }}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                        onClick={() => {
                          const newSlideTexts = [...slideTexts];
                          newSlideTexts.splice(index, 1);
                          setSlideTexts(newSlideTexts);
                        }}
                      >
                        <MinusCircle />
                      </Button>
                    </div>
                    {index !== slideTexts.length - 1 && (
                      <div className="flex items-center gap-2 mx-auto">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => {
                            const newSlideTexts = [...slideTexts];
                            newSlideTexts.splice(index + 1, 0, "");
                            setSlideTexts(newSlideTexts);
                          }}
                        >
                          <PlusCircle />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t px-8 py-4">
        <Button onClick={() => onCreateVideoPreview(slideTexts)}>
          Create video preview
        </Button>
      </div>
    </main>
  );
}
