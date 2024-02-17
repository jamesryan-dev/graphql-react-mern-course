"use client";

import React, { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { ADD_CLIENT } from "@/mutations/clientMutations";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Ref for the modal to use for closing it programmatically
  const modalRef = useRef(null);

  // use the AddClient Mutation
  const [addClient] = useMutation(ADD_CLIENT, {
    // Pass the variables to the mutation
    variables: { name, email, phone },
    // Update the cache after the mutation
    // data is the response from the addClient mutation
    update(cache, { data: { addClient } }) {
      // Read the cache for the clients
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      // Update the cache with the new client
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
    // Close the modal after the mutation is completed
    onCompleted: () => {
      // Close modal here using Bootstrap's modal instance
      const bootstrapModal = bootstrap.Modal.getInstance(modalRef.current);
      bootstrapModal.hide();

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }

    // Call the mutation with correct parameters
    addClient({ variables: { name, email, phone } });
  };

  return (
    <>
      <button
        type="button"
        className="btn py-2 mb-2 btn btn-outline-primary rounded-3 mb-1 mt-1"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        ref={modalRef}
        className="modal fade text-bg-dark"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
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
