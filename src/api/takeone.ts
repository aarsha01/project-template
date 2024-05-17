import { ImageAsset, Project, Script, Slideshow } from "../types";
import md5 from "crypto-js/md5";

type CreateProjectResponse = {
  success: boolean;
  project: Project;
};

type SignedUrlForUploadResponse = {
  uploadUrl: string;
  filepath: string;
};

type CreateImageAssetResponse = {
  imageAsset: ImageAsset;
};

type ImageDimensions = { width: number; height: number };

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

export async function uploadImageToStorage(file: File, projectId: string) {
  const { uploadUrl, filepath }: SignedUrlForUploadResponse =
    await getSignedUrlForUpload();

  await uploadFileViaSignedUrl(file, uploadUrl);

  const { imageAsset } = await createImageAsset(file, filepath);

  return imageAsset;
}

async function getSignedUrlForUpload() {
  const response = await fetch(
    `${process.env.BACKEND_API_HOST}/getImageUploadSignedUrl`
  );

  if (!response.ok) {
    throw new Error("Failed to generate upload url");
  }

  return response.json();
}

async function createImageAsset(
  file: File,
  filepath: string
): Promise<CreateImageAssetResponse> {
  const { width, height }: ImageDimensions = await getImageDimensions(file);
  const fileHash = await getFileHash(file);

  const response = await fetch(
    `${process.env.BACKEND_API_HOST}/createUserImageAsset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filepath: filepath,
        sourceId: fileHash,
        width: width,
        height: height,
        originalFilename: file.name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create Image asset");
  }

  return response.json();
}

function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve) => {
    var reader = new FileReader();

    reader.onload = function () {
      var img = new Image();

      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

function getFileHash(file: File): Promise<string> {
  return new Promise((resolve) => {
    var reader = new FileReader();

    reader.onload = function (event) {
      var binary = event.target.result;
      var md5Hash = md5(binary).toString();
      resolve(md5Hash);
    };

    reader.readAsBinaryString(file);
  });
}

async function uploadFileViaSignedUrl(file: File, uploadUrl: string) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
}
