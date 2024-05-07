import Layout from "../layout";
import { useId, useState } from "react";
import { createProject } from "../../api/takeone";
import { TaskStatus } from "../../types";
import { NewProject } from "../projects/new-project";
import { CreatingScript } from "../projects/creating-script";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();

  const [projectCreationStatus, setProjectCreationStatus] =
    useState<TaskStatus>("none");

  const [prompt, setPrompt] = useState("");

  const handlePromptSubmit = async () => {
    try {
      setProjectCreationStatus("running");
      const { id } = await createProject({ prompt });
      setProjectCreationStatus("success");
      navigate(`/projects/${id}/script`);
    } catch (error) {
      setProjectCreationStatus("error");
      return;
    }
  };

  return (
    <Layout activePage="projects">
      {projectCreationStatus === "none" && (
        <NewProject
          prompt={prompt}
          setPrompt={setPrompt}
          handlePromptSubmit={handlePromptSubmit}
        />
      )}
      {projectCreationStatus === "running" && (
        <CreatingScript prompt={prompt} />
      )}
    </Layout>
  );
}
