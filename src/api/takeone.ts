type CreateProjectResponse = {
  success: boolean;
  id: number;
};

export async function createProject({ prompt }: { prompt: string }) {
  const response = await fetch(`${process.env.BACKEND_API_HOST}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const { id } = (await response.json()) as CreateProjectResponse;
  return id;
}
