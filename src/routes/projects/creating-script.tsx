import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { useId } from "react";

type Props = {
  prompt: string;
};

export function CreatingScript({ prompt }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-8 p-8">
        <div className="flex items-center">
          <h1 className="flex-1 flex gap-2 items-center text-lg font-semibold md:text-2xl">
            <Loader2Icon className="animate-spin" />
            Creating script
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-start gap-16 text-center">
          <div className="flex flex-col items-start gap-2 text-center">
            <Label htmlFor={id}>Your prompt</Label>
            <div className="flex min-w-[600px] gap-2">
              <Textarea id={id} value={prompt} disabled className="bg-muted" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-8 text-center">
            <div className="text-lg font-semibold">
              We’re creating your video script based on the prompt above...
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
