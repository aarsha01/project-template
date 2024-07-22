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
import SlideshowPreview from "./routes/pages/slideshow-preview";
import { ProjectPageRedirector } from "./routes/projects/project-redirector";
import { TestGoogleImageSearch } from "./routes/pages/test-google-image-search";
import { TestBingImageSearch } from "./routes/pages/test-bing-image-search";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/projects/:projectId/slideshow-preview"
          element={<SlideshowPreview />}
        />
        <Route path="/projects/:projectId/script" element={<ScriptEditor />} />
        <Route
          path="/projects/:projectId"
          element={<ProjectPageRedirector />}
        />
        <Route
          path="/projects/:projectId/editor"
          element={<SlideshowEditor />}
        />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/exports" element={<Exports />} />
        <Route
          path="/test/google-image-search"
          element={<TestGoogleImageSearch />}
        />
        <Route
          path="/test/bing-image-search"
          element={<TestBingImageSearch />}
        />
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
