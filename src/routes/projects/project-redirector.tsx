import { getProject } from "@/src/api/takeone";
import { Project } from "@/src/types";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const ProjectPageRedirector = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProject(projectId);
        setProject(project);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, []);

  if (!project) {
    return null;
  }
  const { status } = project;

  if (status === "NONE") {
    return null;
  } else if (status === "SCRIPT_READY") {
    return <Navigate to={`/projects/${projectId}/script`} />;
  } else if (status === "SLIDESHOW_DESCRIPTOR_READY") {
    return <Navigate to={`/projects/${projectId}/script`} />;
  } else if (status === "SLIDESHOW_READY") {
    return <Navigate to={`/projects/${projectId}/slideshow-preview`} />;
  }
  return null;
};
