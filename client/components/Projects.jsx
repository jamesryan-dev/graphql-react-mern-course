"use client";

import { useQuery } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_PROJECTS } from "@/queries/projectQueries";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";

export default function Projects() {
  const { loading, error, data } = useSuspenseQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mb-5">
      <h2>Projects</h2>
      <AddProjectModal />
      {data?.projects?.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
}
