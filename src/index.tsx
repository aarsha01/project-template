import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./router";
import { Toaster } from "@/components/ui/toaster";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app" class="h-full"></div>';

const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <Router />
    <Toaster />
  </StrictMode>
);
