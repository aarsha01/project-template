import React from "react";

import Layout from "./layout";
import { Link } from "react-router-dom";

export default function Exports() {
  return (
    <Layout activePage="exports">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-semibold md:text-2xl">
              Exports
            </h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no exports
              </h3>
              <p className="text-sm text-muted-foreground">
                Create a project and then you can export it as a video
              </p>
              <Link className="mt-4" to="/projects/new">
                Create Project
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
