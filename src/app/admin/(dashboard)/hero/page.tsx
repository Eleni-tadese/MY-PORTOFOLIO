import SettingsEditor from "@/components/admin/editors/SettingsEditor";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader title="Hero" description="Your name, rotating roles, intro, photo and CV." problem={problem} />
      <SettingsEditor
        section="hero"
        initial={{ profile: content.profile, socials: content.socials }}
        education={content.education}
        certificates={content.certificates}
      />
    </>
  );
}
