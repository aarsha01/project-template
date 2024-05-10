import { useParams } from "react-router-dom";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { Project, Slideshow } from "@/src/types";
import { getProject, getSlideshow } from "@/src/api/takeone";
import { Loader2Icon } from "lucide-react";

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

  return (
    <Layout activePage="projects">
      <main className="flex flex-1 flex-col overflow-auto">
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="flex items-center">
            <h1 className="flex-1 flex gap-2 items-center text-lg font-semibold md:text-2xl">
              Slideshow Preview
            </h1>
          </div>
          <div className="flex-1 flex flex-col items-start gap-16 text-center">
            {slideshow ? (
              <div className="text-lg font-semibold">{project?.prompt}</div>
            ) : (
              <Loader2Icon className="animate-spin" />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
