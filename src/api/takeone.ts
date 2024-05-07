import { Script } from "../types";

type CreateProjectResponse = {
  success: boolean;
  id: number;
  script: Script;
};

export async function createProject({ prompt }: { prompt: string }) {
  const response = await fetch(`${process.env.BACKEND_API_HOST}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const { id, success, script } =
    (await response.json()) as CreateProjectResponse;
  if (!success) {
    throw new Error("Failed to create project");
  }
  return { id, script };
}

type GetProjectResponse = {
  id: number;
  prompt: string;
  script: Script;
};

export async function getProject(projectId: string) {
  const response = await fetch(
    `${process.env.BACKEND_API_HOST}/project/${projectId}`
  );
  return (await response.json()) as GetProjectResponse;
}
