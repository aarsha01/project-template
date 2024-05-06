import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Projects from "./routes/projects";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app" class="h-full"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
