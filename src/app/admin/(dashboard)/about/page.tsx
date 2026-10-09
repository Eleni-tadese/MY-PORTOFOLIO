import SettingsEditor from "@/components/admin/editors/SettingsEditor";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader
        title="About"
        description="Focus areas, services and the problem-solving blurb."
        problem={problem}
      />
      <SettingsEditor
        section="about"
        initial={{ profile: content.profile, socials: content.socials }}
        education={content.education}
        certificates={content.certificates}
      />
    </>
  );
}
