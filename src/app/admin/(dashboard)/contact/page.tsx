import SettingsEditor from "@/components/admin/editors/SettingsEditor";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader
        title="Contact"
        description="Email and profile links (GitHub, LinkedIn, LeetCode, Codeforces, Upwork)."
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
