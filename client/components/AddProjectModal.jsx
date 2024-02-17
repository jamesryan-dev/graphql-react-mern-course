"use client";
import { FaList } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useState, useRef } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ADD_PROJECT } from "@/mutations/projectMutations";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { GET_CLIENTS } from "@/queries/clientQueries";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [clientId, setClientId] = useState("");

  const modalRef = useRef(null);

  const { data } = useSuspenseQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
    onCompleted: () => {
      // Close modal here using Bootstrap's modal instance
      const bootstrapModal = bootstrap.Modal.getInstance(modalRef.current);
      bootstrapModal.hide();

      // Reset form fields
      setName("");
      setDescription("");
      setStatus("NEW");
      setClientId("");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("Please fill in all fields");
    }

    addProject({ variables: { name, description, status, clientId } });
  };

  return (
    <>
      <button
        type="button"
        className="btn py-2 mb-2 btn btn-outline-primary rounded-3 mb-1 mt-1"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New Project</div>
        </div>
      </button>

      <div
        ref={modalRef}
        className="modal fade text-bg-dark"
        id="addProjectModal"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                New Project
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="NEW">Not started</option>
                    <option value="IN_PROGRESS">In progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select
                    id="clientId"
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data?.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-success"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
