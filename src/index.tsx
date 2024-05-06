import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, RouteComponentProps, Link } from "@reach/router";
import Projects from "./routes/projects";
import { Redirect } from "@reach/router";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app" class="h-full"></div>';

const ProjectsPage = (props: RouteComponentProps) => <Projects />;

const ErrorPage = (props: RouteComponentProps) => <p>404</p>;

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <Router>
      <ProjectsPage path="/projects" />
      <Redirect from="/" to="/projects" />
      <ErrorPage default />
    </Router>
  </StrictMode>
);
