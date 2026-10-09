import ProjectsList from "@/components/admin/editors/ProjectsList";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader title="Projects" description="Order here is the order in the carousel. Only featured projects appear on the homepage." problem={problem} />
      <ProjectsList initial={content.projects} />
    </>
  );
}
