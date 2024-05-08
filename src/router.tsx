import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Projects from "./routes/pages/projects";
import Exports from "./routes/pages/exports";
import CreateProject from "./routes/pages/create-project";
import ScriptEditor from "./routes/pages/script-editor";
import SlideshowEditor from "./routes/slideshow-editor";

const ProjectPageRedirect = () => {
  const { projectId } = useParams();
  return <Navigate to={`/projects/${projectId}/script`} />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects/:projectId/script" element={<ScriptEditor />} />
        <Route path="/projects/:projectId" element={<ProjectPageRedirect />} />
        <Route
          path="/projects/:projectId/editor"
          element={<SlideshowEditor />}
        />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/exports" element={<Exports />} />
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
