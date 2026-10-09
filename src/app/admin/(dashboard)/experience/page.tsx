import { ExperienceEditor } from "@/components/admin/editors/ListEditors";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader title="Experience" description="Roles in timeline order (top = most recent)." problem={problem} />
      <ExperienceEditor initial={content.experience} />
    </>
  );
}
