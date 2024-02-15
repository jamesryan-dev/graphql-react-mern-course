import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export default async function Clients() {
  const { loading, data, error } = await getClient().query({
    query: GET_CLIENTS,
  });
  console.log("data:", data);
  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.clients.map((client) => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <p>{client.email}</p>
          <p>{client.phone}</p>
        </div>
      ))}
    </main>
  );
}
