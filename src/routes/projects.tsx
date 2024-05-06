import React from "react";
import { createProject } from "../api/takeone";

export default function Project() {
  const handleCreateProject = async () => {
    // Call the API to create a project
    const projectId = await createProject();
    window.alert(`Project created with ID: ${projectId}`);
  };
  return (
    <div className="flex flex-col py-8 px-4 gap-8">
      <div className="flex gap-16 justify-center">
        <h1 className="text-3xl text-center">Hello Takeone</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateProject}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
