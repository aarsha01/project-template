type CreateProjectResponse = {
  success: boolean;
  id: number;
};

export async function createProject() {
  const response = await fetch(`${process.env.BACKEND_API_HOST}/project`, {
    method: "POST",
  });
  const { id } = (await response.json()) as CreateProjectResponse;
  return id;
}
