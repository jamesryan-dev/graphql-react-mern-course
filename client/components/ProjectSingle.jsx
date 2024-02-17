"use client";

import Link from "next/link";
import ClientInfo from "./ClientInfo";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectForm from "./EditProjectForm";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_PROJECT } from "@/queries/projectQueries";

export const dynamic = "force-dynamic";

export default function ProjectSingle({ projectId }) {
  const { data } = useSuspenseQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  return (
    <div className="">
      <div className="text-bg-dark mx-auto w-90 card p-5">
        <Link
          href="/"
          className="btn btn-light btn-sm w-25 d-inline ms-auto text-bg-dark"
        >
          Back
        </Link>

        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        <ClientInfo client={data.project.client} />

        <EditProjectForm project={data.project} />

        <h5 className="mb-3">Delete project</h5>
        <DeleteProjectButton projectId={data.project.id} />
      </div>
    </div>
  );
}
