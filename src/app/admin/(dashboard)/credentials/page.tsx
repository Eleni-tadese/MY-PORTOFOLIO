import { CredentialsEditor } from "@/components/admin/editors/ListEditors";
import { getAdminContent } from "../../data";
import PageHeader from "../PageHeader";

export default async function Page() {
  const { content, problem } = await getAdminContent();
  return (
    <>
      <PageHeader title="Credentials" description="Education and certificates shown in the About section." problem={problem} />
      <CredentialsEditor education={content.education} certificates={content.certificates} profile={content.profile} />
    </>
  );
}
