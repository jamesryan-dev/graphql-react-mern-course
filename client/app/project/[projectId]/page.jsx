export const dynamic = "force-dynamic";
import ProjectSingle from "@/components/ProjectSingle";
import { getClient } from "@/lib/client";
import { GET_PROJECT } from "@/queries/projectQueries";

export const revalidate = 5;

export default async function Page({ params }) {
  const { projectId } = params;
  // const client = getClient();
  // const { data } = await client.query({
  //   query: GET_PROJECT,
  //   variables: { id: projectId },
  // });

  return <ProjectSingle projectId={projectId} />;
}
