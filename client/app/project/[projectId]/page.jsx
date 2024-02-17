export const dynamic = "force-dynamic";
import ProjectSingle from "@/components/ProjectSingle";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const revalidate = 5;

export default async function Page({ params }) {
  const { projectId } = params;

  const GET_PROJECT_QUERY = gql`
    query getProject($id: ID!) {
      project(id: $id) {
        id
        name
        description
        status
        client {
          id
          name
          email
          phone
        }
      }
    }
  `;

  const { data } = await getClient().query({
    query: GET_PROJECT_QUERY,
    variables: { id: projectId },
  });

  return <ProjectSingle projectId={projectId} data={data} />;
}
