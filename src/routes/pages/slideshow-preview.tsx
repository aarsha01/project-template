import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { getProject, getSlideshow } from "@/src/api/takeone";
import {
  useSlideshowPreviewStore,
  useSlideshowPreviewStoreHasChanges,
} from "@/src/stores/slideshow-preview-store";
import { Project, SIZE_FORMATS, SizeFormat } from "@/src/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { SlideshowPlayer } from "../slideshow/player";

type SlideshowPreviewUrlParams = {
  projectId: string;
};

export default function SlideshowPreview() {
  const { projectId } = useParams<SlideshowPreviewUrlParams>();
  const {
    sizeFormat,
    slideshow,
    changeSizeFormat,
    setSlideshow,
    initializeSlideshowPreviewStore,
    saveSlideshowChanges,
  } = useSlideshowPreviewStore();
  const hasChanges = useSlideshowPreviewStoreHasChanges();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reinitialize the store when the projectId changes
    initializeSlideshowPreviewStore();
  }, [projectId]);

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
  }, [projectId]);

  const handleExportVideo = async () => {};
  const handleOpenEditor = async () => {
    window.open(`/projects/${projectId}/editor`, "_self");
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      await saveSlideshowChanges();
      setSaving(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! Something went wrong",
        description: "Your changes could not be saved, please try again later.",
        variant: "destructive",
      });
      setSaving(false);
    }
  };

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
          {slideshow ? (
            <div className="flex-1 flex gap-8">
              <div className="flex-1 flex flex-col items-start gap-4 text-center">
                <div>
                  {slideshow ? (
                    <div className="text-lg font-semibold">
                      {project?.prompt}
                    </div>
                  ) : (
                    <Loader2Icon className="animate-spin" />
                  )}
                </div>
                {slideshow && (
                  <SlideshowPlayer
                    slideshow={slideshow}
                    sizeFormat={sizeFormat}
                  />
                )}
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
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col py-4 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label>Change theme</Label>
                      <ThemeSelect />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Change size format</Label>
                      <SizeFormatSelect
                        sizeFormat={sizeFormat}
                        setSizeFormat={changeSizeFormat}
                      />
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
                  <div className="w-full">
                    <Button
                      variant="default"
                      disabled={!hasChanges || saving}
                      onClick={handleSaveChanges}
                    >
                      {saving && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
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

function toSizeFormatLabel(sizeFormat: SizeFormat) {
  switch (sizeFormat) {
    case "WIDESCREEN_16_9":
      return "Widescreen";
    case "SQUARE_1_1":
      return "Square";
    case "STORY_9_16":
      return "Story";
    case "VERTICAL_4_5":
      return "Vertical";
  }
  const exhaustiveCheck: never = sizeFormat;
}

function SizeFormatSelect({
  sizeFormat,
  setSizeFormat,
}: {
  sizeFormat: SizeFormat;
  setSizeFormat: (sizeFormat: SizeFormat) => void;
}) {
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
          <SelectItem key={sizeFormat} value={sizeFormat}>
            {toSizeFormatLabel(sizeFormat)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
