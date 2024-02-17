"use client";

// import { getClient } from "@/lib/client";
import ClientRow from "./ClientRow";
export const dynamic = "force-dynamic";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_CLIENTS } from "@/queries/clientQueries";
import AddClientModal from "./AddClientModal";

export default function Clients() {
  //   const { loading, data, error } = await getClient().query({
  //     query: GET_CLIENTS,
  //   });

  const { loading, error, data } = useSuspenseQuery(GET_CLIENTS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      <h2>Clients</h2>
      <AddClientModal />
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover mt-3 table-dark table-striped rounded">
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
