import { SkillsEditor } from "@/components/admin/editors/ListEditors";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader title="Skills" description="Skill groups feed the Skills tabs and the scrolling ticker." problem={problem} />
      <SkillsEditor initial={content.skillGroups} projects={content.projects} />
    </>
  );
}
