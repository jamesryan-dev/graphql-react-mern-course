"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "@/queries/projectQueries";
import { UPDATE_PROJECT } from "@/mutations/projectMutations";

function getStatusKey(value) {
  const statusMappings = {
    NEW: "Not started",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
  };

  // Find the key in the mappings where the value matches the input value.
  const key = Object.keys(statusMappings).find(
    (key) => statusMappings[key] === value
  );

  return key || "Unknown"; // Return "Unknown" or any default value if not found.
}

export default function EditProjectForm({ project }) {
  const initialStatusKey = getStatusKey(project.status);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(initialStatusKey);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    updateProject(name, description, status);
  };

  return (
    <div className="mt-5 mb-5">
      <h5 className="mb-3">Edit project</h5>
      <form className="text-bg-dark" onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control text-bg-dark"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control text-bg-dark"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select text-bg-dark"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NEW">Not started</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
