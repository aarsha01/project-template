import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./router";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app" class="h-full"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);
