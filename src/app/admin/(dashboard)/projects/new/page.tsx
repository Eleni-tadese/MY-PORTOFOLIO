import ProjectEditor from "@/components/admin/editors/ProjectEditor";
import { getAdminContent } from "../../../data";
import PageHeader from "../../PageHeader";

export default async function Page() {
  const { problem } = await getAdminContent();
  return (
    <>
      <PageHeader title="New project" problem={problem} />
      <ProjectEditor project={null} />
    </>
  );
}
