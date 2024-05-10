import { getProject, getSlideshow } from "@/src/api/takeone";
import { Project, Slideshow } from "@/src/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { SlideshowComposition } from "@/components/remotion/slideshow-composition";
import { SlideshowPlayer } from "../slideshow/player";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type SlideshowPreviewUrlParams = {
  projectId: string;
};

export default function SlideshowPreview() {
  const { projectId } = useParams<SlideshowPreviewUrlParams>();

  const [slideshow, setSlideshow] = useState<Slideshow>();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    // Fetch the slideshow
    const fetchData = async () => {
      try {
        const [slideshow, project] = await Promise.all([
          getSlideshow(projectId),
          getProject(projectId),
        ]);
        setSlideshow(slideshow);
        setProject(project);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleExportVideo = async () => {};
  const handleOpenEditor = async () => {};

  const backgroundMusicCheckboxId = useId();
  const voiceoversCheckboxId = useId();

  return (
    <Layout activePage="projects">
      <main className="flex flex-1 flex-col overflow-auto">
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="flex items-center">
            <h1 className="flex-1 flex gap-2 items-center text-lg font-semibold md:text-2xl">
              Slideshow Preview
            </h1>
          </div>
          <div className="flex-1 flex gap-8">
            <div className="flex-1 flex flex-col items-start gap-4 text-center">
              <div>
                {slideshow ? (
                  <div className="text-lg font-semibold">{project?.prompt}</div>
                ) : (
                  <Loader2Icon className="animate-spin" />
                )}
              </div>
              {slideshow && <SlideshowPlayer slideshow={slideshow} />}
              <div className="flex gap-4">
                <Button onClick={handleExportVideo}>Export Video</Button>
                <Button variant="outline" onClick={handleOpenEditor}>
                  Open Editor
                </Button>
              </div>
            </div>
            <div className="flex flex-col min-w-[400px]">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Quick edits
              </h4>
              <div className="my-2 w-full h-0.5 bg-black"></div>
              <div className="flex flex-col py-4 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Change theme</Label>
                  <ThemeSelect />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Change size format</Label>
                  <SizeFormatSelect />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={backgroundMusicCheckboxId} />
                  <label
                    htmlFor={backgroundMusicCheckboxId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Disable background music
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={voiceoversCheckboxId} />
                  <label
                    htmlFor={voiceoversCheckboxId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Disable voiceovers
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

const THEMES = ["light", "dark"] as const;
type Theme = (typeof THEMES)[number];

function ThemeSelect() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map((theme) => (
          <SelectItem key={theme} value={theme} className="capitalize">
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const SIZE_FORMATS = ["widescreen", "square", "story", "vertical"] as const;
type SizeFormat = (typeof SIZE_FORMATS)[number];

function SizeFormatSelect() {
  const [sizeFormat, setSizeFormat] = useState<SizeFormat>("widescreen");
  return (
    <Select
      value={sizeFormat}
      onValueChange={(value: SizeFormat) => setSizeFormat(value)}
    >
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SIZE_FORMATS.map((sizeFormat) => (
          <SelectItem
            key={sizeFormat}
            value={sizeFormat}
            className="capitalize"
          >
            {sizeFormat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
