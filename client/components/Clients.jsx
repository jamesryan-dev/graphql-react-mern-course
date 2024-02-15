import { getClient } from "@/lib/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "@/queries/clientQueries";

export default async function Clients() {
  const { loading, data, error } = await getClient().query({
    query: GET_CLIENTS,
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
