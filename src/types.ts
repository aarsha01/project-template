export type Project = {
  id: number;
  prompt: string;
  script: Script;
};

export type Script = {
  slideTextDescriptors: {
    content: string;
  }[];
};

export type TaskStatus = "none" | "running" | "success" | "error";
