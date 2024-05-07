import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "../layout";
import { useNavigate } from "react-router-dom";
import { getProjects } from "@/src/api/takeone";
import { Project } from "@/src/types";
import { ImagesIcon } from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const handleCreateProject = async () => {
    navigate("/projects/new");
  };

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { projects, success } = await getProjects();
        if (!success) {
          throw new Error("Failed to fetch projects");
        }
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);
  return (
    <Layout activePage="projects">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-semibold md:text-2xl">
              Projects
            </h1>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            {projects.length > 0 ? (
              <div className="flex-1 flex flex-col p-4 self-start">
                <div className="flex flex-wrap gap-x-4 gap-y-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex flex-col items-center gap-1 text-center w-[240px] border rounded-lg overflow-hidden cursor-pointer hover:shadow-md"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <div className="flex items-center justify-center w-[240px] h-[160px] bg-gray-100">
                        <ImagesIcon className="h-12 w-12 text-gray-500" />
                      </div>
                      <h4 className="text-xl font-semibold tracking-tight px-2 py-1">
                        {project.prompt || "Untitled Project"}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no projects
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get started by creating a new project with AI
                </p>
                <Button className="mt-4" onClick={handleCreateProject}>
                  Create Project
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
