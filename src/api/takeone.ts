import { Project, Script, Slideshow } from "../types";

type CreateProjectResponse = {
  success: boolean;
  project: Project;
};

export async function createProject({ prompt }: { prompt: string }) {
  const response = await fetch(`${process.env.BACKEND_API_HOST}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const { success, project } = (await response.json()) as CreateProjectResponse;
  if (!success) {
    throw new Error("Failed to create project");
  }
  return project;
}

type GetProjectResponse = {
  success: boolean;
  project: Project;
};

export async function getProject(projectId: string) {
  const response = await fetch(
    `${process.env.BACKEND_API_HOST}/project/${projectId}`
  );
  const { success, project } = (await response.json()) as GetProjectResponse;
  if (!success) {
    throw new Error("Failed to fetch project");
  }
  return project;
}

type GetProjectsResponse = {
  success: boolean;
  projects: Project[];
};

export async function getProjects() {
  const response = await fetch(`${process.env.BACKEND_API_HOST}/projects`);
  return (await response.json()) as GetProjectsResponse;
}

export async function updateScriptAndGenerateSlideshow(
  projectId: string,
  script: string[]
) {
  const response = await fetch(
    `${process.env.BACKEND_API_HOST}/project/${projectId}/update-script-and-generate-slideshow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ script }),
    }
  );
  const { success } = (await response.json()) as { success: boolean };
  if (!success) {
    throw new Error("Failed to generate slideshow");
  }
}

export async function getSlideshow(projectId: string) {
  const response = await fetch(
    `${process.env.BACKEND_API_HOST}/project/${projectId}/slideshow`
  );
  const { success, slideshow } = (await response.json()) as {
    success: boolean;
    slideshow: Slideshow;
  };
  if (!success) {
    throw new Error("Failed to fetch slideshow");
  }
  return slideshow;
}
