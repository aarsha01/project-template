import React from "react";
import { Button } from "@/components/ui/button";
import Layout from "../layout";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const handleCreateProject = async () => {
    navigate("/projects/new");
  };
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
          </div>
        </main>
      </div>
    </Layout>
  );
}
