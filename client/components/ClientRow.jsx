"use client";

import { GET_CLIENTS } from "@/queries/clientQueries";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { FaTrash } from "react-icons/fa";
const { useMutation } = require("@apollo/client");
const { DELETE_CLIENT } = require("../mutations/clientMutations");

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     // filter out client id that matches the deleted client id
    //     data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
    //   });
    // },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          onClick={deleteClient}
          className="btn  btn-outline-danger btn-sm"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
