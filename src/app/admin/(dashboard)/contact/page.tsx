import SettingsEditor from "@/components/admin/editors/SettingsEditor";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader
        title="Contact & CV"
        description="Email, profile links and the CV behind the “View CV” button."
        problem={problem}
      />
      <SettingsEditor
        section="contact"
        initial={{ profile: content.profile, socials: content.socials }}
        education={content.education}
        certificates={content.certificates}
      />
    </>
  );
}
