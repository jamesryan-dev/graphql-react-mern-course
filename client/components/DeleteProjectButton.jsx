"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "@/mutations/projectMutations";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { FaTrash } from "react-icons/fa";

export default function DeleteProjectButton({ projectId }) {
  const router = useRouter();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter((p) => p.id !== deleteProject.id) },
      });
    },
    onCompleted: () => {
      router.push("/");
    },
  });
  return (
    <button
      onClick={deleteProject}
      className="btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center"
    >
      <FaTrash />
      <span className="pl-2">Delete</span>
    </button>
  );
}
