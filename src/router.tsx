import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Projects from "./routes/pages/projects";
import Exports from "./routes/pages/exports";
import CreateProject from "./routes/pages/create-project";
import ScriptEditor from "./routes/pages/script-editor";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects/:projectId/script" element={<ScriptEditor />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/exports" element={<Exports />} />
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
