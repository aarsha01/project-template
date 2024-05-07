import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

const SAMPLE_PROMPTS = [
  "5 ways to lose weight",
  "10 tips for better sleep",
  "How to make a great first impression",
  "The best places to travel in 2022",
  "The future of remote work",
];

type Props = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handlePromptSubmit: () => void;
};

export function NewProject({ prompt, setPrompt, handlePromptSubmit }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-8 p-8">
        <div className="flex items-center">
          <h1 className="flex-1 text-lg font-semibold md:text-2xl">
            Create new project
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-start gap-16 text-center">
          <div className="flex flex-col items-start gap-2 text-center">
            <Label htmlFor={id}>Your prompt</Label>
            <div className="flex min-w-[600px] gap-2">
              <Textarea
                id={id}
                value={prompt}
                placeholder="What video are you making today?"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (!prompt) return;
                  if (e.key === "Enter" && e.metaKey) {
                    handlePromptSubmit();
                  }
                }}
              />
              <Button
                className="ml-2"
                onClick={handlePromptSubmit}
                disabled={!prompt}
              >
                Create script
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-8 text-center">
            <small className="text-sm font-medium leading-none">
              or choose and customize one of the prompts below
            </small>
            <div className="flex flex-col gap-4">
              {SAMPLE_PROMPTS.map((samplePrompt) => (
                <div className="flex min-w-[600px] gap-2 items-center">
                  <Textarea
                    value={samplePrompt}
                    readOnly
                    rows={1}
                    className="min-h-[40px]"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => setPrompt(samplePrompt)}
                  >
                    Use
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
