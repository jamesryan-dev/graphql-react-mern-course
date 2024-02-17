"use client";

export const dynamic = "force-dynamic";
import { GET_PROJECT } from "@/queries/projectQueries";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Link from "next/link";

export default function ProjectSingle({ projectId, data }) {
  console.log("projectId", projectId);

  return (
    <div>
      <div className="mx-auto w-75 card p-5">
        <Link href="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>

        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        {/* <ClientInfo client={data.project.client} />

        <EditProjectForm project={data.project} />

        <DeleteProjectButton projectId={data.project.id} /> */}
      </div>
    </div>
  );
}
