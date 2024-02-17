"use client";

import { GET_CLIENTS } from "@/queries/clientQueries";
import { FaTrash } from "react-icons/fa";
const { useMutation } = require("@apollo/client");
const { DELETE_CLIENT } = require("../mutations/clientMutations");

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        // filter out client id that matches the deleted client id
        data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
      });
    },
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
