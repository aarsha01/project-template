import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { TaskStatus } from "@/src/types";
import { FinalizeScript } from "../script-editor/finalize-script";
import { GeneratingSlideshow } from "../script-editor/generating-slideshow";
import { updateScriptAndGenerateSlideshow } from "@/src/api/takeone";

type ScriptEditorUrlParams = {
  projectId: string;
};

export default function ScriptEditor() {
  const { projectId } = useParams<ScriptEditorUrlParams>();

  const [slideshowGenerationStatus, setSlideshowGenerationStatus] =
    useState<TaskStatus>("none");

  const handleCreateVideoPreview = async (slideTexts: string[]) => {
    try {
      setSlideshowGenerationStatus("running");
      await updateScriptAndGenerateSlideshow(projectId, slideTexts);
      setSlideshowGenerationStatus("success");
    } catch (error) {
      setSlideshowGenerationStatus("error");
      return;
    }
  };

  return (
    <Layout activePage="projects">
      {slideshowGenerationStatus === "none" && (
        <FinalizeScript
          projectId={projectId}
          onCreateVideoPreview={handleCreateVideoPreview}
        />
      )}
      {(slideshowGenerationStatus === "running" ||
        slideshowGenerationStatus === "success") && (
        <GeneratingSlideshow
          projectId={projectId}
          isSlideShowGenerationComplete={
            slideshowGenerationStatus === "success"
          }
        />
      )}
    </Layout>
  );
}
