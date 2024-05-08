import { useParams } from "react-router-dom";
import Layout from "../layout";
import { useEffect } from "react";

type SlideshowPreviewUrlParams = {
  projectId: string;
};

export default function SlideshowPreview() {
  const { projectId } = useParams<SlideshowPreviewUrlParams>();

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
            <div className="text-lg font-semibold">
              I will work on this tomorrow
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
